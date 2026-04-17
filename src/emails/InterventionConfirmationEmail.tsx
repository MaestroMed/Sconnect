import * as React from "react";
import { Callout, SectionTitle, Shell, ShellHeader } from "./_components";

export interface InterventionConfirmationEmailProps {
  prenom: string;
  phoneEmergency?: string;
}

export default function InterventionConfirmationEmail({
  prenom,
  phoneEmergency,
}: InterventionConfirmationEmailProps) {
  return (
    <Shell preview="Demande d'intervention reçue" variant="urgent">
      <ShellHeader>Demande d&apos;intervention reçue</ShellHeader>
      <SectionTitle>Bonjour {prenom},</SectionTitle>
      <p style={{ margin: "0 0 12px 0", fontSize: 14, lineHeight: "22px" }}>
        Nous avons bien reçu votre demande d&apos;<strong>intervention urgente</strong>.
        Notre équipe va vous recontacter dans les plus brefs délais pour organiser
        l&apos;intervention.
      </p>
      <Callout tone="warning">
        <strong>Situation vraiment urgente&nbsp;?</strong> N&apos;hésitez pas à nous
        appeler directement.
      </Callout>
      {phoneEmergency && (
        <p
          style={{
            textAlign: "center",
            margin: "16px 0",
            fontSize: 22,
            fontWeight: 700,
            color: "#16a34a",
          }}
        >
          {phoneEmergency}
        </p>
      )}
    </Shell>
  );
}
