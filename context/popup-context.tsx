import { createContext, useContext, useState, ReactNode } from "react";

type PopupContextType = {
  showPopup: (content: ReactNode) => void;
  hidePopup: () => void;
  popupContent: ReactNode | null;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  console.log("PopupProvider rendered");
  const [popupContent, setPopupContent] = useState<ReactNode | null>(null);

  const showPopup = (content: ReactNode) => {
    console.log("OK");
    setPopupContent(content);
  };
  const hidePopup = () => setPopupContent(null);

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup, popupContent }}>
      {children}
      {popupContent && (
        <div
          id="popup"
          className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="rounded-[10px] border bg-white p-4">
            {popupContent}
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
