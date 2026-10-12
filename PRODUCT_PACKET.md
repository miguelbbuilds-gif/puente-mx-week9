# PUENTE MX — Product packet

Week 9 · AI 2041 · Chapter 8, “The Job Savior.”

## Vacuum

**First-proof.**

Young people and displaced workers can already do useful work, but they lack a first piece of evidence that an employer can trust. The absence is not “another place to upload a CV” and not “another badge an AI can print.” The absence is a credible record of real work, produced before a formal job exists.

## Target user

The primary person is a young adult in Mexico who has not yet held a formal job, or a worker changing fields, and who cannot point to recognized experience. In the demo that person is represented by the fictional profile **Valeria Núñez**.

The second operator is an employer-side supervisor. In the demo that role is fictional **Laura Espinosa** and is operated by the same person using the demo. A real version would separate those accounts. The product decision would not.

## Core loop

1. The person sees the pay, the deadline, and the scope before starting.
2. They do one bounded microexperience: analyze a fictional sales set and recommend an action.
3. They leave a decision trace, including whether they used AI.
4. They answer a simulated defense. That stage is practice, not certification.
5. A human supervisor reads that exact work, scores a rubric, writes feedback, and either approves it or asks for changes.
6. Approval creates a portable demonstration record the person can show, hide, or ask to have reviewed.
7. The product points to a possible next occupational rung without offering a job.

Microexperience is the mechanism. First-proof is the thing the mechanism is for.

## Why this is not a job board or a CV builder

A job board lists openings and collects applications. PUENTE MX lists no openings and accepts no applications to real employers.

A CV builder helps someone describe themselves. PUENTE MX asks them to do a piece of work, show the numbers they used, and explain the choice. The portable artifact is a record of that assignment, not a biography.

It is also not an automatic skill-certification system. Finishing the screens does not create the record. A model never chooses approve or reject.

## AI boundary

AI may help a participant think or edit. The product does not detect that use and does not punish a disclosed use. The participant must say whether they used it and, if they did, what they did versus what the tool did. That statement is part of the evidence the supervisor reads.

AI is not allowed to be the verifier. There is no score threshold that approves the work. The rubric average is labeled informative. The approve and request-changes controls are human choices, and in this demo they only work in the supervisor role.

## Human verification

The supervisor must:

- see the submitted answers, the decision trace, and the simulated defense
- score analytical reasoning, recommendation quality, explanation of decisions, communication, and awareness of limitations
- write personalized feedback
- choose approve or request changes
- record whether a future interview should even be considered

The stored review has to be newer than the submitted package. If the participant resubmits after a requested revision, the old approval stops counting until a person sends the rubric again. Tampering with LocalStorage to set “approved” without scores, feedback, and an explicit decision does not pass the same checks.

## Shadow and safeguards

The shadow of a product like this is familiar: unpaid work dressed up as opportunity, fake placement rates, and credentials that look official but prove nothing.

Visible safeguards:

- No unpaid real work. The assignment is fictional.
- Compensation is shown first and marked as not paid: MXN $1,500 illustrative.
- Scope and the five-day period are explicit, and the clock is not real.
- Hiring is not guaranteed. An interview consideration is not an interview.
- No automatic AI certification.
- Human approval is required.
- AI use is disclosed and not treated as cheating by default.
- The participant owns the evidence: they can hide the record and request a look at the feedback.
- Sample employers, people, payments, reviews, and statistics are labeled fictional or illustrative.
- The accountability screen cannot record a confirmed interview or hire. A separate chart uses invented numbers and says so.
- The verification link works only in the same browser and says it is not a public or third-party registry.

## Working slice

The slice that runs today is one full loop with shared state:

Landing → role → participant dashboard → Norte Consultores sales analysis → save/submit → decision trace → simulated defense → supervisor review of that submission → approve or request changes → demonstration record → print/copy/local detail → illustrative next rungs.

The sales set has 16 fictional rows across four products and four regions. Charts and totals are calculated in the app so the participant can inspect them. The written recommendation is still theirs.

## Success metrics

For this demo, success is behavioral and honest:

- A participant can finish the microexperience without leaving the app.
- The supervisor view shows the same answers, not a canned essay.
- No record exists before a complete human rubric and an explicit approval.
- Requested changes, pending review, and approval are distinguishable after refresh.
- The person can hide the record and request a feedback review.
- Session counts for confirmed interviews and hires remain zero.
- A reader can tell simulated data from a real outcome without reading the source code.

A future program could add independently confirmed interviews and hires. Those numbers are not success metrics of this build, and the product refuses to display stand-ins as if they were.

## Simulated versus real

| Piece | In this build |
| --- | --- |
| Company, participant, supervisor | Fictional labels |
| Sales data and compensation | Fictional, shown in the interface |
| Payment | Not real |
| Defense | Simulated questions, not a live interview |
| Supervisor | The demo user, clearly labeled |
| Rubric decision | Real as a user action inside the demo; not a real employer’s decision |
| Experience record | Generated in the browser after that action |
| Verification ID | Local demo id, not a public credential |
| Next career steps | Illustrative pathways, not vacancies |
| Program dashboard (24, 17, 15, 9, 3, 1) | Invented example |
| Confirmed interviews and hires | Always zero; not editable |
| Accounts, server, identity, cryptography | Not included |

What is real is the interaction: typed answers persist, gates block illegal shortcuts through the UI, and the record cannot appear before the human step.
