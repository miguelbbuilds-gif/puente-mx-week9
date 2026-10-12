# PUENTE MX — Test plan

Manual checks for the demonstration. Expected results describe what a person should see. Run them in a current desktop browser, then repeat layout checks at 320, 375, 768, 1024, and a wide desktop width.

Reset the demo from the footer before a full journey so LocalStorage starts clean.

## 1. Landing calls to action

**Steps:** Open `/`. Activate **Comenzar mi primera experiencia**. Go back. Activate **Explorar cómo funciona**.

**Expected:** The first button opens `/rol`. The second opens `/como-funciona`. Both pages render inside the same header and footer. No dead control.

## 2. Role selection changes the interface

**Steps:** On `/rol`, enter as **Joven / Participante**. Then use **Cambiar a supervisor**.

**Expected:** The banner reads the active role. Participant mode shows Mi panel, Proyecto, Traza, Defensa, Constancia, and Siguiente peldaño. Supervisor mode shows Panel supervisor, Revisión, and Responsabilidad.

## 3. Demo labeling

**Steps:** Visit the landing page, the project, and the accountability screen.

**Expected:** A **Modo demostración** banner is visible. Norte Consultores, the compensation, and sample people are marked fictional or illustrative. The record, when it exists, says **Constancia de demostración — No acredita empleo real.**

## 4. Scope and compensation before the work

**Steps:** Open `/proyecto` before accepting the checkbox.

**Expected:** Compensation of MXN $1,500, the 5-day illustrative deadline, and the scope are visible. The copy states that no payment will be made. Submit is rejected until the checkbox is accepted and the four answers meet the minimum length.

## 5. Save survives refresh

**Steps:** Accept the scope, type a partial answer, choose **Guardar progreso**, and refresh the browser.

**Expected:** The text and the accepted scope are still there. The status is not approved. A timestamp indicates the save in this browser.

## 6. Submit validation

**Steps:** Try to submit the project with an empty recommendation. Then fill all four answers past the stated minimums and submit.

**Expected:** The empty attempt shows an error and does not open the trace as a completed step. The valid attempt stores `projectSubmittedAt` and moves the journey to the decision trace.

## 7. Decision trace and AI disclosure

**Steps:** Open `/trazabilidad` before the project is submitted. Then submit the project and complete the trace twice: once with “No la usé”, once after reset with “Sí, de forma puntual” and an empty detail field, then with a detail.

**Expected:** The trace is blocked before the project exists. “No la usé” does not ask for a penalty and can be submitted. “Sí, de forma puntual” or “Sí, me apoyé bastante” requires a short description. The disclosure is stored and later visible to the supervisor. The copy says disclosure is not punitive.

## 8. Simulated defense does not certify

**Steps:** Submit three defense answers of at least 20 characters each. Open `/constancia` without a supervisor review.

**Expected:** The page states that the defense is simulated and is not an interview. After submission, the status is waiting for human review. The record page explains that there is no certificate yet.

## 9. Supervisor reads the real submission

**Steps:** Submit a distinctive sentence in the recommendation. Switch to supervisor and open **Revisión**.

**Expected:** That exact sentence is on the review screen, with the trace and defense answers from the same browser.

## 10. Approval gate

**Steps:** On the review screen, choose **Enviar revisión humana** with no scores. Then score only four criteria. Then add scores, but leave feedback under 40 characters. Then omit the approve/changes choice. Then omit the interview consideration.

**Expected:** Each attempt is refused and no experience record appears. The participant status stays unapproved.

## 11. Revision status

**Steps:** Complete a valid review and choose **Solicitar cambios**. Return to the participant project.

**Expected:** Status is changes requested. The supervisor feedback is visible. The participant can edit and choose **Reenviar evidencia**. After resubmit, the previous decision is no longer treated as approval, and the supervisor must send the rubric again.

## 12. Human approval creates the record

**Steps:** Complete all five scores, at least 40 characters of feedback, **Aprobar**, and an explicit interview yes or no. Submit while the role is supervisor. Switch to the participant and open the record.

**Expected:** The record shows the demo name, Norte Consultores, the project title, the work, skills, feedback, date, a `PMX-DEMO-` id, and verified-in-this-demo status. It links to `/verificar/:id`. It does not claim identity verification, real payment, cryptography, or a job offer.

## 13. Participant ownership

**Steps:** On the record, hide it from the profile. Open the participant dashboard. Show it again. Submit a feedback-review note shorter than 15 characters, then a longer one. Open the supervisor dashboard.

**Expected:** Hidden removes it from the verified-experience card and keeps the record page available. The short note is rejected. The longer note is stored and visible to the supervisor role, with copy that it never left the browser.

## 14. Print and copy

**Steps:** Choose **Imprimir o guardar PDF**. Choose **Copiar resumen**.

**Expected:** The browser print dialog opens. Print CSS hides the demo banner, navigation, and footer. The disclaimer remains on the page. Copy puts a Spanish summary on the clipboard, including the fictional-company label and the local detail URL. If clipboard permission fails, the summary is shown for manual copy.

## 15. Verification route

**Steps:** Open the printed or copied detail link. Change the id in the address bar. Refresh both URLs.

**Expected:** The matching id shows the work, trace, defense, and rubric, and says the check is local only. A wrong id says no public registry exists. Refresh does not blank a valid record.

## 16. Next rungs

**Steps:** Open `/siguientes-pasos` before and after approval.

**Expected:** Three illustrative roles appear: analista administrativo junior, asistente de operaciones, and analista comercial junior. Each lists signals from the project, missing skills, why it might be relevant, and a next learning action. Each is labeled as not a vacancy. Nothing claims live labor demand. Before approval, signals are described as not yet verified.

## 17. Accountability numbers

**Steps:** Open `/responsabilidad` before any submission, after the defense, and after approval. Try to find a control that increments hires.

**Expected:** Session metrics follow the actual demo. Confirmed interviews and confirmed hires stay at 0. The 24/17/15/9/3/1 board is labeled invented. Copy explains that real placement claims would need independent verification.

## 18. Reset

**Steps:** Finish part of the journey, open **Restablecer demostración**, cancel, then confirm.

**Expected:** Cancel keeps the data. Confirm clears the submission, review, and record, and returns to the landing page. A refresh stays empty.

## 19. Deep link refresh

**Steps:** Visit `/proyecto`, `/trazabilidad`, `/defensa`, `/supervisor/revision`, `/constancia`, and `/responsabilidad`, refreshing on each.

**Expected:** Every route renders the app rather than a server 404. Progress already stored in LocalStorage is still there.

## 20. Responsive layout and keyboard

**Steps:** At 320, 375, 768, 1024, and a wide width, move from landing to role, project, and record. Tab through the role buttons, the project form, and the rubric. Open and close the mobile menu with the button and Escape.

**Expected:** No page-level horizontal scroll. The sales table may scroll inside its own frame. Controls are at least about 44px tall. The mobile menu exposes the same destinations. Focus is visible. Radios in the rubric can be operated from the keyboard.

## 21. No automatic certification path

**Steps:** Search the participant flow for any control that approves the work without the supervisor rubric.

**Expected:** There is none. The defense completion screen tells the person to switch roles. The review screen says the average does not decide verification.
