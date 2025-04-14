from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)


@app.route("/api/format-file", methods=["POST"])
def format_file():
    if "file" not in request.files:
        return jsonify({"error": "Aucun fichier envoyé"}), 400

    file = request.files["file"]

    try:
        dfs = pd.read_excel(file, engine="openpyxl", sheet_name=None)
        data_df = pd.DataFrame(columns=["Date", "Calls"])
        error_list = []

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

            new_data = []

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
                            new_data.append(
                                {
                                    "Date": f"{row['Date'].date()} {col}:00",
                                    "Calls": row[col],
                                }
                            )
                else:
                    error_list.append(
                        {"Date": row["Date"], "Difference": total - sum_hours}
                    )

            if len(new_data) > 0:
                new_df = pd.DataFrame(new_data)
                new_df["Date"] = pd.to_datetime(
                    new_df["Date"], format="%Y-%m-%d %H:%M:%S"
                )
                data_df = pd.concat([data_df, new_df], ignore_index=True)

        data_df = data_df.drop_duplicates()
        data_df = data_df.sort_values(by="Date")
        data_df = data_df.reset_index(drop=True)

        csv_path = "data.csv"
        data_df.to_csv("./data/" + csv_path, index=False)

        return jsonify({"csv_path": csv_path}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
