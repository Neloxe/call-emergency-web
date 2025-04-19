import { createContext, useContext, useState, ReactNode } from "react";

type PopupContextType = {
  showPopup: (content: ReactNode) => void;
  hidePopup: () => void;
  popupContent: ReactNode | null;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [popupContent, setPopupContent] = useState<ReactNode | null>(null);

  const showPopup = (content: ReactNode) => setPopupContent(content);
  const hidePopup = () => setPopupContent(null);

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup, popupContent }}>
      {children}
      {popupContent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-[10px] border bg-white p-6 shadow-lg">
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
