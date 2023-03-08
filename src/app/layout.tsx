/** @jsxImportSource @emotion/react */
"use client";

import { Global, css } from "@emotion/react";
import emotionReset from "emotion-reset";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital@1&family=Golos+Text&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <Global
        styles={css`
          ${emotionReset}

          html, body {
            height: 100%;
            margin: 0;
          }

          html, body {
            font-family: "Golos Text", sans-serif;
            font-size: 16px;
            line-height: 1.5em;
          }

          button {
            border: none;
            background: none;
            color: inherit;
            padding: 0;
            margin: 0;
            font-family: inherit;
            font-size: inherit;
            cursor: pointer;
          }

          .material-symbols-rounded {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 200,
            'opsz' 48
          }

          h1, h2, h3 {
            font-family: "Crimson Pro", serif;
            margin-bottom: 20px;
          }

          h1 {
            font-size: 48px;
          }

          h2 {
            font-size: 36px;
          }

          h3 {
            font-size: 24px;
          }
        `}
      />
      <body>{children}</body>
    </html>
  )
}
