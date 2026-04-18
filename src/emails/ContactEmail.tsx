import * as React from "react";
import { Field, SectionTitle, Shell, ShellHeader } from "./_components";

export interface ContactEmailProps {
  nom: string;
  email: string;
  objet: string;
  message: string;
}

export default function ContactEmail({ nom, email, objet, message }: ContactEmailProps) {
  return (
    <Shell preview={`Nouveau message: ${objet}`}>
      <ShellHeader>Nouveau message de contact</ShellHeader>
      <SectionTitle>Expéditeur</SectionTitle>
      <Field label="Nom">{nom}</Field>
      <Field label="Email">{email}</Field>
      <Field label="Objet">{objet}</Field>
      <SectionTitle>Message</SectionTitle>
      <Field label="Contenu">
        {message.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Field>
    </Shell>
  );
}
