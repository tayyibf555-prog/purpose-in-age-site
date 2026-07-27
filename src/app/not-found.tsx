import { Panel } from "@/components/Panel";
import { PageIntro } from "@/components/PageIntro";
import { Pill } from "@/components/Pill";

export default function NotFound() {
  return (
    <>
      <PageIntro
        headline="That page isn’t"
        cut="here."
        lead="Either the link is wrong or I moved something. The writing is all in the journal, and everything else is one click away."
      />

      <Panel tone="clay">
        <div className="flex flex-wrap gap-5">
          <Pill href="/" variant="bone" size="lg">
            Go to the homepage
          </Pill>
          <Pill href="/journal" variant="sand" size="lg">
            Read the journal
          </Pill>
        </div>
      </Panel>
    </>
  );
}
