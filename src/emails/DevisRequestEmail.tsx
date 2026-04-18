import * as React from "react";
import { Callout, Field, SectionTitle, Shell, ShellHeader } from "./_components";

export interface DevisRequestEmailProps {
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  typeBatiment: string;
  services: string[];
  delai: string;
  description: string;
  budget?: string;
}

export default function DevisRequestEmail(props: DevisRequestEmailProps) {
  const isUrgent = props.delai === "Urgent (moins de 48h)";
  return (
    <Shell preview={`Devis: ${props.services.join(", ")}`}>
      <ShellHeader>Nouvelle demande de devis</ShellHeader>

      {isUrgent && (
        <Callout tone="warning">
          <strong>Demande urgente</strong> — intervention souhaitée sous 48h.
        </Callout>
      )}

      <SectionTitle>Client</SectionTitle>
      <Field label="Nom complet">
        {props.civilite} {props.prenom} {props.nom}
      </Field>
      <Field label="Email">{props.email}</Field>
      <Field label="Téléphone">{props.telephone}</Field>

      <SectionTitle>Adresse d&apos;intervention</SectionTitle>
      <Field label="Adresse">
        {props.adresse}
        <br />
        {props.codePostal} {props.ville}
      </Field>
      <Field label="Type de bâtiment">{props.typeBatiment}</Field>

      <SectionTitle>Demande</SectionTitle>
      <Field label="Services">{props.services.join(", ")}</Field>
      <Field label="Délai">{props.delai}</Field>
      {props.budget && <Field label="Budget estimé">{props.budget}</Field>}

      <SectionTitle>Description</SectionTitle>
      <Field label="Détails">
        {props.description.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Field>
    </Shell>
  );
}
