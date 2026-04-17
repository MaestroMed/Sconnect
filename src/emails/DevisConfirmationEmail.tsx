import * as React from "react";
import { Button } from "@react-email/components";
import { Callout, SectionTitle, Shell, ShellHeader } from "./_components";

export interface DevisConfirmationEmailProps {
  prenom: string;
  services: string[];
  phoneEmergency?: string;
}

export default function DevisConfirmationEmail({
  prenom,
  services,
  phoneEmergency,
}: DevisConfirmationEmailProps) {
  return (
    <Shell preview="Votre demande de devis a bien été reçue">
      <ShellHeader>Demande reçue ✓</ShellHeader>
      <SectionTitle>Bonjour {prenom},</SectionTitle>
      <p style={{ margin: "0 0 12px 0", fontSize: 14, lineHeight: "22px" }}>
        Nous avons bien reçu votre demande de devis pour&nbsp;:
      </p>
      <ul style={{ margin: "0 0 16px 20px", padding: 0, fontSize: 14 }}>
        {services.map((s) => (
          <li key={s}>
            <strong>{s}</strong>
          </li>
        ))}
      </ul>
      <p style={{ margin: "0 0 16px 0", fontSize: 14, lineHeight: "22px" }}>
        Notre équipe étudie votre projet et vous recontacte dans les plus brefs
        délais pour vous transmettre un devis personnalisé.
      </p>

      {phoneEmergency && (
        <>
          <Callout tone="info">
            <strong>Besoin d&apos;une intervention urgente&nbsp;?</strong>
          </Callout>
          <div style={{ textAlign: "center", margin: "16px 0" }}>
            <Button
              href={`tel:${phoneEmergency}`}
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Appeler le {phoneEmergency}
            </Button>
          </div>
        </>
      )}
    </Shell>
  );
}
