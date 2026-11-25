# Domain 1: Security and Risk Management — Exam-Ready Study Guide

This guide was developed by reviewing the supplied `CISSP_Notes.txt`, including its Domain 1 objective list and explanatory chapters. It covers every listed objective, defines core terms, and provides original flash cards and multiple-choice practice. Questions are independent study material, not official (ISC)² exam questions. Laws and regulatory details vary by jurisdiction; use current authoritative requirements for real decisions.

## How to use this guide

First learn the objective explanations and glossary. Then answer the questions without looking at the key, explain why each distractor is wrong, and use the flash cards to revisit weak areas. The CISSP exam tests judgment: identify the business or legal need, the accountable role, and the proportionate action before selecting a technical control.

## Objective explanations

### 1.1 Understand, adhere to, and promote professional ethics
Security professionals are trusted with powerful access and sensitive information. Make decisions lawfully, honestly, competently, and with the public interest and organizational obligations in view.

#### 1.1.1 (ISC)² Code of Professional Ethics
Know the four canons: protect society and the infrastructure; act honorably, honestly, justly, responsibly, and legally; provide diligent and competent service to principals; and advance and protect the profession. When duties conflict, use the code's order and seek appropriate counsel rather than conceal a problem.

#### 1.1.2 Organizational code of ethics
Follow the employer's conduct, acceptable-use, conflict-of-interest, reporting, and confidentiality rules alongside professional obligations. Leaders reinforce them through clear examples, training, safe reporting channels, and consistent enforcement.

### 1.2 Understand and apply security concepts
Choose safeguards from the information's business value, threats, obligations, and risk tolerance. Security is a management responsibility: controls support the mission while protecting people, information, and services.

#### 1.2.1 Confidentiality, integrity, availability, authenticity, and nonrepudiation
Confidentiality limits disclosure; integrity protects accuracy and authorized change; availability provides timely reliable access. Authenticity establishes that an identity or message is genuine, while nonrepudiation supplies evidence that a party performed an action and cannot credibly deny it.

### 1.3 Evaluate and apply security governance principles
Governance sets direction, accountability, decision rights, and oversight for security. Management translates that direction into funded programs, assigned owners, controls, and measured operations.

#### 1.3.1 Alignment to strategy, goals, mission, and objectives
Security priorities should enable the organization's mission and business goals while reducing relevant risk. Translate business needs into security objectives, measures, budgets, and risk decisions that executives can understand.

#### 1.3.2 Organizational processes
Acquisitions, divestitures, restructuring, and major projects change assets, access, obligations, and risk. Governance committees coordinate affected owners, review security impacts, assign decisions, and track required actions through the transition.

#### 1.3.3 Organizational roles and responsibilities
Executives establish risk direction; business and data owners classify information and accept risk; custodians operate safeguards; users follow policy; security advisers guide and monitor. Clear separation of duties prevents one person from controlling incompatible steps.

#### 1.3.4 Security control frameworks
Frameworks organize control objectives and practices so an organization can select, implement, assess, and improve safeguards consistently. Tailor a framework to laws, mission, risk, and scope; using a framework does not itself prove compliance or security.

#### 1.3.5 Due care and due diligence
Due care is taking reasonable protective action; due diligence is the continuing work of identifying risk, verifying controls, and checking results. Together they show responsible oversight and help keep protections appropriate as conditions change.

### 1.4 Determine compliance and other requirements
Identify obligations before selecting controls: map applicable laws, regulations, contracts, licenses, and adopted standards to systems, data, locations, and responsible owners. Keep evidence and review changes so obligations remain traceable.

#### 1.4.1 Contractual, legal, industry standards, and regulatory requirements
Contracts can impose security, audit, notification, retention, and service duties; laws and regulations may impose additional requirements. Determine which obligations apply to the organization and activity, document control owners, and verify performance rather than assuming a certification covers everything.

#### 1.4.2 Privacy requirements
Privacy rules govern personal data through its lifecycle: purpose, collection, notice, lawful use, minimization, access, retention, sharing, and disposal. Identify applicable jurisdictions and roles, and involve privacy/legal specialists when scope or lawful basis is unclear.

### 1.5 Understand legal and regulatory issues in a holistic context
Security decisions can create legal consequences across countries, industries, contracts, and people. Coordinate with counsel and privacy/compliance teams, preserve evidence, and avoid treating one country's rules as universal.

#### 1.5.1 Cybercrimes and data breaches
Unauthorized access, disruption, theft, and misuse may trigger criminal, civil, regulatory, and contractual consequences. A breach response should contain harm, preserve evidence, determine affected data and jurisdictions, and meet applicable notification and reporting duties.

#### 1.5.2 Licensing and intellectual property requirements
Respect ownership and license terms for software, data, media, inventions, and branding. Track entitlements and permitted use; unauthorized copying or redistribution can create liability even when the technology is easy to duplicate.

#### 1.5.3 Import/export controls
Some goods, software, encryption, technical data, and services are subject to trade restrictions or export controls. Screen destinations, parties, product classifications, and licensing needs with qualified trade counsel before transfer; rules change and have jurisdiction-specific exceptions.

#### 1.5.4 Transborder data flow
Moving or remotely accessing data across national borders can invoke the laws of the origin, destination, and parties involved. Map data locations and subprocessors, identify transfer restrictions and safeguards, and include the requirements in contracts and architecture.

#### 1.5.5 Privacy
Privacy is the appropriate handling of information about people, not simply secrecy. Limit collection and use to justified purposes, protect individual rights, and design controls for access, correction, retention, sharing, and deletion where required.

### 1.6 Understand requirements for investigation types
Administrative investigations enforce internal policy; civil cases resolve private disputes; criminal investigations address offenses prosecuted by the state; regulatory and industry investigations assess obligations or standards. Authority, evidence rules, disclosure, privacy, and potential sanctions vary, so involve counsel and preserve chain of custody.

### 1.7 Develop, document, and implement policy, standards, procedures, and guidelines
Policy states management intent and mandatory high-level rules; standards define required baselines; procedures give repeatable steps; guidelines offer recommended choices. Approve, communicate, train on, enforce, review, and grant documented exceptions through accountable owners.

### 1.8 Identify, analyze, and prioritize Business Continuity requirements
Business continuity keeps prioritized products and services operating through disruption. Identify critical activities, dependencies, impacts, time requirements, and strategies; document, exercise, and update plans as the business changes.

#### 1.8.1 Business Impact Analysis (BIA)
A BIA identifies critical processes and the consequences of disruption over time, including financial, operational, legal, and reputational impacts. It establishes recovery priorities and requirements such as RTO and RPO; it is not the same as choosing a recovery technology.

#### 1.8.2 Develop and document scope and plan
Define covered business units, locations, systems, assumptions, interfaces, and exclusions; get sponsor and owner agreement. Document roles, communication, dependencies, recovery strategies, activation criteria, and procedures, then exercise and revise the plan.

### 1.9 Contribute to and enforce personnel security policies and procedures
People controls apply throughout employment and other work relationships, using lawful, role-appropriate safeguards. Protect personal information, apply policy consistently, and coordinate HR, legal, security, and business owners.

#### 1.9.1 Candidate screening and hiring
Verify identity, qualifications, references, and other checks as permitted by law and proportionate to role risk. Resolve adverse findings consistently before granting sensitive access, and retain only permitted screening information.

#### 1.9.2 Employment agreements and policies
Agreements should establish duties such as confidentiality, acceptable use, intellectual property, security obligations, and reporting. Explain applicable policies before access is granted and retain acknowledgement without assuming it replaces training or enforcement.

#### 1.9.3 Onboarding, transfers, and termination
Onboarding grants only approved role-based access after required checks and training; transfers trigger timely access review and removal of no-longer-needed rights. Termination requires coordinated access revocation, asset return, preservation of records, and communication appropriate to the circumstances.

#### 1.9.4 Vendor, consultant, and contractor agreements and controls
Set security, privacy, incident-notification, subcontracting, audit, access, retention, and return/deletion duties in contracts. Sponsor access, scope it to need and duration, monitor performance, and revoke it at contract end.

#### 1.9.5 Compliance policy requirements
Tell personnel which laws, contracts, and internal rules apply to their work and how to report a concern. Define ownership, evidence, exception handling, and consequences; monitor compliance and update guidance when obligations change.

#### 1.9.6 Privacy policy requirements
Clearly explain what personal data is collected, why, how it is used/shared/retained, and how people can exercise applicable rights. Align notices and practices with actual processing, applicable law, and internal privacy controls.

### 1.10 Understand and apply risk management concepts
Risk management identifies uncertainty that could affect objectives, estimates its likelihood and impact, and selects a response consistent with appetite and tolerance. Owners make and document decisions; security supports them with analysis and control evidence.

#### 1.10.1 Identify threats and vulnerabilities
A threat is a potential cause of harm; a vulnerability is a weakness that could be exploited or triggered. Identify relevant actors, events, assets, weaknesses, and existing safeguards, then validate assumptions and business consequences.

#### 1.10.2 Risk assessment and analysis
Assess likelihood and impact to estimate risk, using qualitative scales, quantitative estimates, or a suitable combination. Consider inherent risk before controls and residual risk after controls; record assumptions, uncertainty, and the accountable owner.

#### 1.10.3 Risk response
Common responses are mitigate/reduce with controls, avoid by ending the risky activity, transfer/share through mechanisms such as insurance or contracts, or accept within approved tolerance. A third party can share financial exposure but does not erase accountability or all risk.

#### 1.10.4 Countermeasure selection and implementation
Choose safeguards that address the risk and meet business, legal, and operational needs at a justified cost. Assign an owner, implement and test the control, document residual risk, and obtain authorized acceptance where needed.

#### 1.10.5 Types of controls
Preventive controls reduce the chance of an event; detective controls reveal events or control failure; corrective controls restore or limit damage after detection. A control can have several functions, so classify by its intended effect in context.

#### 1.10.6 Control assessments (security and privacy)
Assess whether safeguards are suitably designed, implemented, and operating effectively, including privacy protections. Use evidence and appropriately independent assessors, document findings and scope, and remediate based on risk.

#### 1.10.7 Monitoring and measurement
Ongoing monitoring checks control performance, exposure, and changes in threats or business conditions. Define meaningful metrics, sources, owners, thresholds, and review cadence; measurements inform decisions but do not replace judgment.

#### 1.10.8 Reporting
Report material risks, control status, exceptions, incidents, and remediation to the right decision-makers in clear business terms. State scope, evidence, trends, uncertainty, owners, and due dates so leadership can act and accept risk knowingly.

#### 1.10.9 Continuous improvement and risk maturity
Use incidents, assessments, metrics, exercises, and changed requirements to improve the risk program in a repeatable cycle. Maturity models describe process capability; a higher score is not a substitute for effective outcomes or reduced risk.

#### 1.10.10 Risk frameworks
Risk frameworks provide a structured vocabulary and lifecycle for governance, assessment, response, and monitoring. Select and tailor a recognized framework to the organization, map obligations and controls, and avoid treating framework adoption as a guarantee of compliance.

### 1.11 Understand and apply threat modeling concepts and methodologies
Threat modeling systematically identifies assets, trust boundaries, attack paths, threats, and mitigations. Perform it early and revisit it as design changes; use methods such as STRIDE or attack trees to structure analysis, not as a replacement for context and validation.

### 1.12 Apply Supply Chain Risk Management (SCRM) concepts
SCRM addresses risks introduced by suppliers, products, services, subcontractors, and delivery or support channels. Apply requirements before selection, validate assurance proportionate to criticality, monitor changes, and plan for failure or exit.

#### 1.12.1 Risks associated with hardware, software, and services
Risks include counterfeit or tampered components, vulnerable or malicious code, insecure updates, opaque dependencies, service outages, and unauthorized data access. Trace critical dependencies, assess provenance and change processes, and design controls for the impact of supplier failure.

#### 1.12.2 Third-party assessment and monitoring
Assess a supplier before onboarding and throughout the relationship using evidence suited to risk, such as independent reports, questionnaires, testing, and incident history. Reassess after material changes and track findings to closure; certificates alone do not establish that every requirement is met.

#### 1.12.3 Minimum security requirements
Specify a clear baseline for access, encryption, vulnerability handling, incident notice, data use, personnel, subcontractors, evidence, and termination. Make requirements measurable, contractually binding, risk-based, and verifiable.

#### 1.12.4 Service-level requirements
Define measurable service commitments, such as availability, response and restoration targets, support, reporting, and remedies. Align service levels with business impact and recovery objectives, and verify performance using agreed evidence.

### 1.13 Establish and maintain a security awareness, education, and training program
Awareness builds recognition and safe habits; education develops broader understanding; training teaches role-specific skills. Set audiences and objectives, deliver accessible content, measure behavior and capability, and improve the program.

#### 1.13.1 Methods and techniques
Use role-appropriate, accessible formats such as short lessons, exercises, phishing simulations, social-engineering scenarios, champions, and gamification. Reinforce reporting and safe response without shaming individuals or exposing sensitive results.

#### 1.13.2 Periodic content reviews
Review content on a defined schedule and after incidents, technology changes, new threats, or changed requirements. Remove outdated advice, validate links and contacts, and involve relevant subject-matter owners.

#### 1.13.3 Program effectiveness evaluation
Measure learning and real outcomes using completion, knowledge checks, reporting rates, simulation trends, incident patterns, and role-based capability. Protect learner privacy, interpret metrics in context, and use results to improve content rather than reward superficial completion alone.

## Key terms and definitions

| Term | Definition |
|---|---|
| Accountability | Being answerable for decisions and actions, supported by identity, logs, and review. |
| Acceptable risk | Risk an authorized owner agrees to retain within defined tolerance. |
| Authenticity | Confidence that an identity, source, or message is genuine. |
| Availability | Timely, reliable access to information and services by authorized users. |
| Business continuity (BC) | Plans and capabilities that sustain prioritized business activities during disruption. |
| Business Impact Analysis (BIA) | Analysis of disruption effects over time used to prioritize recovery needs. |
| Confidentiality | Protection against unauthorized disclosure of information. |
| Control / countermeasure / safeguard | A measure that modifies risk by preventing, detecting, or correcting unwanted events. |
| Corrective control | A control that restores a secure state or limits damage after an event. |
| Data controller | In privacy regimes using this term, the party deciding why and how personal data is processed. |
| Data processor | A party processing personal data on behalf of a controller under instructions and obligations. |
| Due care | Reasonable protective action expected of a responsible organization or professional. |
| Due diligence | Ongoing investigation, verification, and oversight that checks risks and safeguards. |
| Framework | A structured set of governance and risk practices used to guide and assess a program. |
| Governance | Direction, authority, accountability, and oversight for achieving organizational objectives. |
| Guideline | Recommended, generally flexible advice for applying policy or standards. |
| Impact | The magnitude of harm or consequence if a risk event occurs. |
| Inherent risk | Risk before considering the effect of controls. |
| Integrity | Protection of information against improper alteration or destruction; maintaining correctness. |
| Intellectual property (IP) | Creations and intangible assets protected by legal rights, such as software, inventions, and marks. |
| Likelihood | The estimated chance or frequency of a specified event in a defined context. |
| Nonrepudiation | Evidence that supports attribution of an action and makes credible denial difficult. |
| Personally identifiable information (PII) | Information that identifies or can reasonably be linked to a person, subject to applicable definitions. |
| Privacy | Appropriate and lawful handling of information about people and their rights and expectations. |
| Policy | Management-approved high-level statement of intent, direction, and mandatory rules. |
| Residual risk | Risk remaining after selected controls are applied. |
| Risk | Effect of uncertainty on objectives; in security, potential loss from threats exploiting weaknesses. |
| Risk appetite | Broad amount and type of risk an organization is willing to pursue or retain. |
| Risk assessment | Process for identifying, analyzing, and evaluating risk. |
| Risk tolerance | Specific acceptable variation or exposure around an objective or risk limit. |
| Risk owner | Person accountable for managing or accepting a particular risk. |
| Risk transfer / sharing | Contractual or financial arrangement that shares some consequences; it does not remove all responsibility. |
| RPO | Recovery Point Objective: maximum targeted data loss measured in time. |
| RTO | Recovery Time Objective: target time to restore a service after disruption. |
| Service-level agreement (SLA) | Contracted, measurable service performance commitments and associated terms. |
| Standard | Mandatory, specific requirements that implement policy consistently. |
| Threat | Potential cause of an unwanted incident that can harm an asset or objective. |
| Threat model | Structured representation of assets, boundaries, threats, attack paths, and mitigations. |
| Vulnerability | Weakness that a threat could exploit or trigger. |
| STRIDE | Threat-modeling mnemonic: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. |
| Procedure | Required or approved ordered steps for performing a task. |
| Separation of duties | Dividing sensitive tasks among people to reduce error, fraud, and abuse. |
| Chain of custody | Documented control and transfer history for evidence from collection through presentation. |
| Data minimization | Limiting personal data collection and retention to what is necessary for a defined purpose. |
| Transborder data flow | Transfer or access of data across national borders. |
| Supply Chain Risk Management (SCRM) | Identifying and managing risks from suppliers, components, software, services, and dependencies. |
| Control assessment | Evidence-based evaluation of control design, implementation, and operation. |
| Risk maturity | The consistency and capability of an organization's risk-management processes. |

## Flash cards

| # | Front | Back |
|---:|---|---|
| 1 | Name the four (ISC)² ethics canons. | Protect society/infrastructure; act honorably and legally; serve principals diligently and competently; advance and protect the profession. |
| 2 | Confidentiality vs. integrity? | Confidentiality prevents unauthorized disclosure; integrity protects correctness and authorized modification. |
| 3 | Availability? | Authorized users can access information and services reliably when needed. |
| 4 | Authenticity vs. nonrepudiation? | Authenticity establishes genuineness; nonrepudiation provides evidence that supports attribution and prevents credible denial. |
| 5 | Governance vs. management? | Governance sets direction and oversight; management implements and operates the program. |
| 6 | Due care vs. due diligence? | Due care takes reasonable protective action; due diligence continually verifies risks and safeguards. |
| 7 | Policy vs. standard vs. procedure vs. guideline? | Policy states intent; standard mandates specifics; procedure gives steps; guideline recommends. |
| 8 | Who normally accepts business risk? | The authorized business or risk owner, not the security adviser acting alone. |
| 9 | What does a BIA establish? | Criticality, disruption impacts, recovery priorities, and time/data recovery requirements. |
| 10 | RTO? | Target time to restore a service after disruption. |
| 11 | RPO? | Maximum targeted data loss measured as time. |
| 12 | Preventive control? | Reduces the likelihood that an unwanted event occurs. |
| 13 | Detective control? | Reveals an event or control failure. |
| 14 | Corrective control? | Restores operation or limits consequences after an event. |
| 15 | Threat vs. vulnerability? | A threat can cause harm; a vulnerability is a weakness it may exploit. |
| 16 | Inherent vs. residual risk? | Before controls vs. after controls. |
| 17 | Name four common risk responses. | Mitigate, avoid, transfer/share, accept. |
| 18 | Does insurance eliminate cyber risk? | No. It may share financial loss but leaves operational, legal, reputational, and residual risks. |
| 19 | What does STRIDE stand for? | Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. |
| 20 | What is a trust boundary in threat modeling? | A point where data or control crosses between different trust levels or security domains. |
| 21 | Why assess a supplier before procurement? | Security requirements and architecture are easier to shape before dependency and access are established. |
| 22 | Why is a vendor certificate insufficient by itself? | It may not cover the relevant service, scope, control, period, or contract requirement. |
| 23 | What belongs in minimum supplier requirements? | Measurable security/privacy duties, incident notice, access, subcontracting, evidence, and exit terms. |
| 24 | What distinguishes administrative from criminal investigation? | Administrative enforces internal rules; criminal investigates offenses prosecuted by the state under criminal process. |
| 25 | Why maintain chain of custody? | To document evidence handling and support its integrity and admissibility. |
| 26 | What is the first personnel access principle? | Grant only approved access needed for the role, after required checks and training. |
| 27 | What should happen on role transfer? | Reassess the new role and remove rights no longer required. |
| 28 | What should happen at termination? | Revoke access promptly, recover assets, preserve needed records, and coordinate communication. |
| 29 | Data minimization? | Collect and retain only personal data needed for a justified purpose. |
| 30 | What is a data controller? | A party that determines purposes and means of personal data processing under applicable law. |
| 31 | What does an SLA measure? | Agreed service performance such as availability, response, restoration, and support. |
| 32 | Awareness vs. education vs. training? | Awareness promotes recognition; education builds understanding; training develops task-specific ability. |
| 33 | What should trigger a training content review? | Scheduled review, changed threats/technology/law, or lessons from incidents and exercises. |
| 34 | What is a useful training effectiveness signal beyond completion? | Improved knowledge/behavior, reporting quality, role capability, and incident trends interpreted in context. |
| 35 | Why align security with business strategy? | Controls should reduce relevant risk while enabling mission and business objectives. |
| 36 | Can compliance certification prove an organization is secure? | No; it is scoped evidence and does not guarantee security or satisfy every obligation. |
| 37 | What is transborder data flow? | Data transfer or access across national borders, potentially invoking multiple legal regimes. |
| 38 | What should happen before cross-border data transfer? | Map jurisdictions and parties, identify legal transfer conditions, and implement suitable safeguards. |
| 39 | What is separation of duties? | Splitting incompatible tasks so one person cannot complete a sensitive process unchecked. |
| 40 | What is a control assessment? | Evidence-based review of whether controls are designed, implemented, and operating effectively. |

## Multiple-choice practice

Choose the **best** answer. Attempt all questions before consulting the key. These are original questions built from the supplied notes and objective scope.

### Questions

1. A security professional discovers a serious weakness that management wants hidden from affected customers. What is the best first course of action?
   A. Delete the evidence to protect the employer  B. Follow lawful reporting and escalation duties, preserve evidence, and seek appropriate counsel  C. Publish personal data to prove the issue  D. Ignore it unless an audit asks
2. Which ethics canon most directly calls on a professional to serve a client with appropriate skill and care?
   A. Protect society  B. Act honorably and legally  C. Provide diligent and competent service to principals  D. Advance the profession
3. Which property primarily prevents unauthorized disclosure?
   A. Integrity  B. Availability  C. Confidentiality  D. Nonrepudiation
4. A signed message lets the recipient verify its source and detect alteration. Which pair is most directly supported?
   A. Availability and privacy  B. Authenticity and integrity  C. Confidentiality and availability  D. Anonymity and authorization
5. Who should normally make the decision to accept a business risk?
   A. The control operator  B. The authorized risk owner  C. The external auditor  D. Any security analyst
6. Which is the clearest example of due diligence?
   A. Installing a firewall once  B. Regularly reviewing risk, control evidence, and changes  C. Writing an aspirational policy  D. Buying insurance without assessment
7. An acquisition is planned. What should security governance do early?
   A. Wait for integration to finish  B. Identify assets, access, obligations, and risks affected and assign decision owners  C. Transfer all data immediately  D. Disable audit logging
8. Which statement about a control framework is correct?
   A. Adopting it guarantees compliance  B. It structures practices that must be tailored and assessed  C. It transfers risk to the framework publisher  D. It replaces leadership decisions
9. A contract requires incident notice within a specified period. This is primarily what kind of obligation?
   A. Contractual  B. Optional guideline  C. Technical vulnerability  D. Ethical canon only
10. What is a sound first step when mapping privacy requirements?
   A. Collect all data just in case  B. Identify data, purposes, parties, locations, and applicable jurisdictions  C. Encrypt backups only  D. Assume the vendor is responsible
11. A breach affects customers in several countries. What should guide notification decisions?
   A. The location of the security team only  B. Applicable laws, contracts, affected data/people, and counsel's advice  C. One global deadline guessed by IT  D. Public relations preference alone
12. An employee copies commercial software beyond the permitted license count. What issue is most direct?
   A. Availability  B. Intellectual property/license compliance  C. RTO  D. Chain of custody
13. Before exporting encryption technology, the organization should:
   A. Assume software is exempt  B. Have qualified staff determine applicable classification, destination, parties, and license needs  C. Remove the product name  D. Ask the recipient to decide
14. What makes an investigation's evidence handling more defensible?
   A. Shared administrator accounts  B. Documented chain of custody and authorized collection  C. Editing source files to simplify review  D. Discarding original timestamps
15. Which document ordinarily provides mandatory, detailed configuration requirements beneath policy?
   A. Guideline  B. Standard  C. Mission statement  D. Press release
16. What is the main purpose of a BIA?
   A. Pick a firewall  B. Prioritize processes and determine disruption impacts and recovery needs  C. Attribute a crime  D. Approve a software license
17. A service must recover within four hours after an outage. This target is its:
   A. RPO  B. RTO  C. SLA penalty  D. Inherent risk
18. A team can tolerate no more than 30 minutes of lost transaction data. This describes its:
   A. RTO  B. RPO  C. Due care  D. Availability classification
19. Which is the best termination control?
   A. Revoke access in coordination with HR, recover assets, and preserve required records  B. Wait for the next quarterly review  C. Keep a shared account active  D. Delete all records immediately
20. What should a role transfer trigger?
   A. No change until annual review  B. Reassess authorization and remove access no longer needed  C. Give both old and new role privileges permanently  D. Disable logging
21. A threat is best described as:
   A. A weakness  B. A potential cause of harm  C. A control assessment  D. An accepted risk
22. Residual risk is risk:
   A. Before safeguards  B. Remaining after safeguards  C. That has no owner  D. Always transferred
23. An organization stops offering a risky product. Which response is this?
   A. Accept  B. Avoid  C. Detect  D. Share
24. What is true about purchasing cyber insurance?
   A. It removes all accountability  B. It may share certain financial losses but does not eliminate risk  C. It prevents incidents  D. It replaces incident response
25. A door alarm that reports unauthorized entry is primarily:
   A. Detective  B. Preventive  C. Corrective  D. Directive
26. Which control best limits the impact after a system is compromised?
   A. Incident containment and recovery procedures  B. Policy formatting  C. Candidate interview  D. Data classification label alone
27. What should an effective control assessment examine?
   A. Purchase cost only  B. Design, implementation, operation, scope, and evidence  C. Vendor marketing alone  D. The assessor's preferred framework only
28. What is a useful purpose of risk metrics?
   A. Replace risk-owner decisions  B. Track control/risk trends against defined thresholds  C. Guarantee there will be no breach  D. Hide uncertainty
29. Which report best supports executive risk decisions?
   A. Raw technical logs only  B. Business impact, likelihood, evidence, options, owner, and residual exposure  C. Unprioritized findings without context  D. A list of products purchased
30. Risk maturity improvement should be driven by:
   A. More documents regardless of outcomes  B. Evidence, incidents, assessments, metrics, and changed conditions  C. A higher score alone  D. Avoiding independent review
31. What does STRIDE's “E” represent?
   A. Encryption  B. Elevation of privilege  C. Exposure window  D. Evidence handling
32. Why model trust boundaries?
   A. To find where data/control crosses between different trust levels  B. To set a license price  C. To calculate employee performance  D. To replace testing
33. When is threat modeling most useful?
   A. Only after retirement  B. Early in design and again when architecture changes  C. After every vulnerability is public  D. Only during procurement closeout
34. What is a sound supplier assurance approach?
   A. Accept a certificate as proof of every control  B. Assess evidence proportionate to supplier criticality and monitor material changes  C. Ask only about price  D. Stop reviewing after contract signature
35. Which clause best supports supply-chain security?
   A. Vague promise to be secure  B. Measurable security, incident, subcontractor, evidence, and exit obligations  C. No notification duty  D. Unlimited data use
36. Service levels should be based primarily on:
   A. Marketing claims  B. Business impact and recovery needs, expressed as measurable targets  C. Vendor preference only  D. The lowest possible price
37. A phishing simulation produces poor results. What is the best response?
   A. Shame named employees publicly  B. Improve targeted instruction and measure subsequent behavior while protecting privacy  C. Stop all training  D. Treat clicks as proof of malicious intent
38. Which distinguishes awareness, education, and training accurately?
   A. They are identical  B. Awareness builds recognition, education understanding, training task skills  C. Training is only policy distribution  D. Awareness is only for administrators
39. When should security training content be reviewed?
   A. Only when an employee complains  B. Periodically and after material changes, incidents, or new lessons  C. Never after initial launch  D. Only when renewing insurance
40. Which is the strongest evidence that an awareness program is effective?
   A. A large slide deck  B. Completion alone  C. Multiple contextual measures of learning, behavior, reporting, and outcomes over time  D. A high number of simulated failures

### Answer key and rationales

1. **B** — Act lawfully, escalate through proper channels, preserve evidence, and obtain counsel where duties conflict. 2. **C** — The third canon requires diligent and competent service to principals. 3. **C** — Confidentiality protects against unauthorized disclosure. 4. **B** — Signatures can support source authenticity and integrity. 5. **B** — Risk acceptance belongs to an authorized owner with business accountability. 6. **B** — Due diligence is continuing verification and oversight. 7. **B** — Early governance coordinates changed assets, obligations, access, and accountability. 8. **B** — Frameworks guide consistent work but require tailoring and evidence. 9. **A** — The duty arises from a contract. 10. **B** — Mapping data and processing context identifies applicable privacy duties. 11. **B** — Jurisdiction, data, people, contracts, and legal advice determine duties. 12. **B** — Exceeding license rights creates IP/compliance exposure. 13. **B** — Trade rules depend on item, destination, parties, and jurisdiction. 14. **B** — Authorization and documented evidence handling support integrity and admissibility. 15. **B** — Standards state mandatory detailed requirements. 16. **B** — BIA establishes criticality, impacts, and recovery priorities. 17. **B** — RTO is the target restoration time. 18. **B** — RPO is the targeted maximum data-loss interval. 19. **A** — Termination requires coordinated revocation, asset return, and record handling. 20. **B** — A move changes business need and should remove stale access. 21. **B** — A threat is a potential cause of harm; a vulnerability is a weakness. 22. **B** — Residual risk remains after control effects. 23. **B** — Ending the activity avoids its associated risk. 24. **B** — Insurance transfers/shares limited financial consequences, not all exposure. 25. **A** — The alarm detects and reports an event. 26. **A** — Containment and recovery limit harm and restore service after compromise. 27. **B** — Effective assessment is evidence-based and considers design through operation. 28. **B** — Metrics track performance and trends against defined criteria. 29. **B** — Decision makers need prioritized business context, evidence, choices, and ownership. 30. **B** — Improvement responds to evidence and changed context, not scores alone. 31. **B** — STRIDE E is elevation of privilege. 32. **A** — Boundaries identify transitions where trust assumptions and threats change. 33. **B** — Early and iterative modeling allows design changes before they become costly. 34. **B** — Assurance is risk-based and continuing; certificates have scope limits. 35. **B** — Specific measurable terms make duties enforceable and verifiable. 36. **B** — Service commitments should support prioritized business recovery. 37. **B** — Use results for constructive targeted improvement, not punishment. 38. **B** — The three approaches target recognition, understanding, and skills. 39. **B** — Content must reflect current threats, systems, rules, and lessons. 40. **C** — Several contextual outcome measures are stronger than attendance or a single simulation.

## Last-pass exam reminders

- Prefer the answer that first establishes business context, authority, and risk ownership.
- A security professional advises and implements; an authorized business owner accepts business risk.
- Preserve evidence, follow lawful process, and involve counsel for legal or jurisdictional questions.
- A control framework, certification, contract, insurance policy, or vendor report reduces uncertainty only within its actual scope.
- Distinguish RTO (time to restore) from RPO (acceptable data-loss interval), and inherent from residual risk.
- Security and privacy obligations apply across the full information and supplier lifecycle.
