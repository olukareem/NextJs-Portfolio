"use client"
import React, { createContext, useState, useContext } from 'react';

interface ContactDialogContextType {
  isContactDialogOpen: boolean;
  setIsContactDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactDialogContext = createContext<ContactDialogContextType | undefined>(undefined);

export const ContactDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  return (
    <ContactDialogContext.Provider value={{ isContactDialogOpen, setIsContactDialogOpen }}>
      {children}
    </ContactDialogContext.Provider>
  );
};

export const useContactDialog = () => {
  const context = useContext(ContactDialogContext);
  if (context === undefined) {
    throw new Error('useContactDialog must be used within a ContactDialogProvider');
  }
  return context;
};