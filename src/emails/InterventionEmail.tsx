import * as React from "react";
import { Callout, Field, SectionTitle, Shell, ShellHeader } from "./_components";

export interface InterventionEmailProps {
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  typeBatiment: string;
  typeIntervention: string;
  description: string;
  disponibilite: string;
}

export default function InterventionEmail(props: InterventionEmailProps) {
  return (
    <Shell preview={`URGENT — ${props.typeIntervention} à ${props.ville}`} variant="urgent">
      <ShellHeader>Intervention urgente demandée</ShellHeader>

      <Callout tone="danger">
        <strong>URGENT — INTERVENTION REQUISE</strong>
      </Callout>

      <SectionTitle>Client</SectionTitle>
      <Field label="Nom complet">
        {props.civilite} {props.prenom} {props.nom}
      </Field>
      <Field label="Email">{props.email}</Field>
      <Field label="Téléphone">{props.telephone}</Field>

      <SectionTitle>Lieu de l&apos;intervention</SectionTitle>
      <Field label="Adresse">
        {props.adresse}
        <br />
        {props.codePostal} {props.ville}
      </Field>
      <Field label="Type de bâtiment">{props.typeBatiment}</Field>

      <SectionTitle>Détails</SectionTitle>
      <Field label="Type d'intervention">{props.typeIntervention}</Field>
      <Field label="Disponibilité client">{props.disponibilite}</Field>

      <SectionTitle>Description</SectionTitle>
      <Field label="Détails">
        {props.description.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Field>

      <Callout tone="success">
        Contacter immédiatement le client&nbsp;: <strong>{props.telephone}</strong>
      </Callout>
    </Shell>
  );
}
