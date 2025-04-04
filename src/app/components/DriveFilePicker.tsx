'use client';
import { useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

// Extend Window to avoid TypeScript errors
declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

interface DriveFilePickerProps {
  onFileSelect: (file: {
    id: string;
    name: string;
    url: string;
    mimeType: string;
  }) => void;
}

export default function DriveFilePicker({ onFileSelect }: DriveFilePickerProps) {
  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/drive.readonly',
    onSuccess: (tokenResponse) => {
      loadPicker(tokenResponse.access_token);
    },
  });

  const loadPicker = (accessToken: string) => {
    if (!window.gapi) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('picker', () => createPicker(accessToken));
      };
      document.body.appendChild(script);
    } else {
      createPicker(accessToken);
    }
  };

  const createPicker = (accessToken: string) => {
    if (!window.google?.picker) return;

    const view = new window.google.picker.View(window.google.picker.ViewId.DOCS);
    const picker = new window.google.picker.PickerBuilder()
      .addView(view)
      .setOAuthToken(accessToken)
      .setDeveloperKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!)
      .setCallback((data: any) => {
        if (data.action === window.google?.picker?.Action?.PICKED) {
          const file = data.docs[0];
          onFileSelect({
            id: file.id,
            name: file.name,
            url: file.url,
            mimeType: file.mimeType,
          });
        }
      })
      .build();
    picker.setVisible(true);
  };

  return (
    <button
      onClick={() => login()}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Select from Google Drive
    </button>
  );
}

