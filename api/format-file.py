from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)


@app.route("/api/format-file", methods=["POST"])
def format_file():
    if "file" not in request.files:
        return jsonify({"error": "Aucun fichier envoyé"}), 400

    file = request.files["file"]

    try:
        dfs = pd.read_excel(file, engine="openpyxl", sheet_name=None)

        error_list = []

        csv_file = "data.csv"
        folder_path = "./data/"
        if os.path.exists(csv_file):
            existing_data = pd.read_csv(csv_file, parse_dates=["Date"])
        else:
            existing_data = pd.DataFrame(columns=["Date", "Calls"])

        all_new_data = []

        for sheet_name, df in dfs.items():
            df_cleaned = df.dropna()
            df_transposed = df_cleaned.transpose()

            df_transposed = df_transposed.reset_index(drop=True)
            df_transposed.columns = range(df_transposed.shape[1])
            df_transposed = df_transposed.drop(index=0)
            df_transposed = df_transposed.reset_index(drop=True)
            df_transposed.columns = range(df_transposed.shape[1])

            heures = [f"{h:02}:00" for h in range(24)]
            heures = ["Date", "Total"] + heures
            df_transposed.columns = heures

            df_transposed = df_transposed.drop(index=0)
            df_transposed = df_transposed.reset_index(drop=True)

            df_transposed["Date"] = pd.to_datetime(df_transposed["Date"])

            for index, row in df_transposed.iterrows():
                sum_hours = sum(
                    row[col]
                    for col in df_transposed.columns
                    if col not in ["Date", "Total"]
                )

                total = int(row["Total"].replace("\xa0", ""))

                if abs(sum_hours - total) <= 5:
                    for col in df_transposed.columns:
                        if col not in ["Date", "Total"]:
                            all_new_data.append(
                                {
                                    "Date": f"{row['Date'].date()} {col}:00",
                                    "Calls": row[col],
                                }
                            )
                else:
                    error_list.append(
                        {"Date": row["Date"], "Difference": total - sum_hours}
                    )

        if all_new_data:
            new_df = pd.DataFrame(all_new_data)
            new_df["Date"] = pd.to_datetime(new_df["Date"], format="%Y-%m-%d %H:%M:%S")

            combined_data = pd.concat([existing_data, new_df], ignore_index=True)
            combined_data = combined_data.drop_duplicates(subset=["Date"], keep="first")
            combined_data = combined_data.sort_values(by="Date")
            combined_data = combined_data.reset_index(drop=True)

            combined_data.to_csv(folder_path + csv_file, index=False)

        errors = pd.DataFrame(error_list)
        errors.to_csv(folder_path + "errors.csv", index=False)

        return jsonify({"csv_path": csv_file}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
