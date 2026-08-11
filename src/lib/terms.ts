/**
 * Terms of Service content.
 *
 * Transcribed verbatim from the agreement supplied by the business — the
 * wording is legal copy and must not be edited for style. Only the structure
 * (section/clause nesting) is expressed here; rendering lives in
 * `app/terms/page.tsx`. Email addresses in `paragraphs` are auto-linked.
 */

/** Shown under the page title. Update whenever the wording below changes. */
export const TERMS_LAST_UPDATED = "August 11, 2026";

export type TermsClause = {
  /** e.g. "1.1 Term" — omitted for sections that are a single block of prose. */
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type TermsSection = {
  /** Anchor slug, also used by the table of contents. */
  id: string;
  /** e.g. "1" — omitted for the unnumbered closing section. */
  number?: string;
  title: string;
  clauses: TermsClause[];
};

export const termsSections: TermsSection[] = [
  {
    id: "term",
    number: "1",
    title: "Term",
    clauses: [
      {
        heading: "1.1 Term",
        paragraphs: [
          "The term of this Agreement commences on the Effective Date and continues for the initial period of one (1) year, unless and until earlier terminated as provided under this Agreement or applicable law (“Term”). On expiration of the Term, this Agreement automatically renews for additional successive one (1) year terms unless and until either Party provides written Notice of termination at least thirty (30) days before the end of the then-current term, or unless and until earlier terminated as provided under this Agreement.",
        ],
      },
    ],
  },
  {
    id: "services",
    number: "2",
    title: "Services",
    clauses: [
      {
        heading: "2.1 Services",
        paragraphs: ["EASTERN FULFILLMENT CO will provide the following services to you:"],
        list: [
          "Receive shipments from Manufacture / Supplier of the Product.",
          "Provide storage for the received inventory at the warehouse at monthly cost.",
          "We will perform pick, pack and shipping of the Products from the available Inventory and ship such products directly to the customer.",
          "Will provide and use standard shipping materials (boxes / Poly Mailers) at our discretion.",
          "Will maintain summaries of all orders shipped and received for 120 days.",
        ],
      },
    ],
  },
  {
    id: "payment-terms",
    number: "3",
    title: "Payment Terms and Conditions",
    clauses: [
      {
        heading: "3.1 Payments & Invoicing",
        paragraphs: [
          "EASTERN FULFILLMENT CO utilizes auto pay model for the payment of services. A valid Credit / debit card is required to be kept on file and will be charged at the end of each business day. (Unless made arrangements for weekly invoicing.)",
        ],
      },
      {
        heading: "3.2 Options to Pay",
        paragraphs: [
          "EASTERN FULFILLMENT CO offers convenience to pay for invoices online through the following payment methods: Credit Card (4.5% processing fee), or a wire transfer (Free within the U.S.).",
        ],
      },
      {
        heading: "3.4 Privacy",
        paragraphs: [
          "EASTERN FULFILLMENT CO uses a 3rd party payment processing company Stripe. EASTERN FULFILLMENT CO does not store any payment information on its own servers; all of the Company's payment information is stored with Stripe. If Company’s invoice remains unpaid for more than 2 days from the issue date, Company agrees that EASTERN FULFILLMENT CO shall have the right to auto-charge any payment method that has been used in the past.",
        ],
      },
    ],
  },
  {
    id: "risk-of-loss",
    number: "4",
    title: "Risk of Loss and Insurance",
    clauses: [
      {
        heading: "4.1 Title",
        paragraphs: [
          "You hereby agree that inventory stored at our facilities will hold under EASTERN FULFILLMENT CO title, or any other rights of ownership in the Inventory, that EASTERN FULFILLMENT CO shall have a lien under applicable law(s) on all inventory and products held by EASTERN FULFILLMENT CO.",
        ],
      },
      {
        heading: "4.2 Risk of Loss",
        paragraphs: [
          "Company hereby agrees that at no time during the period that Products are held by EASTERN FULFILLMENT CO as Inventory in the Warehouse will carry the risk of loss in the Inventory. Risk of Loss in Inventory will continue to be held by you. EASTERN FULFILLMENT CO but specifically disclaims liability of loss except for instances of Gross Negligence by EASTERN FULFILLMENT CO. IN THE EVENT OF INVENTORY LOSS DUE TO INVENTORY COUNT INACCURACIES THAT IS IN POSSESSION AS INVENTORY AT EASTERN FULFILLMENT CO YOU AGREES THAT IT WILL BE CONSIDERED AN “INVENTORY LOSS”.",
        ],
      },
      {
        heading: "4.3 Insurance",
        paragraphs: [
          "YOU HEREBY AGREES THAT IT IS YOUR RESPONSIBILITY, AT ALL TIMES, TO MAINTAIN AN INSURANCE POLICY THAT COVERS THE COST OF THE PRODUCTS HELD as INVENTORY. Company has the option of adding the Warehouse as a designated storage location to your general inventory policy. If requested, EASTERN FULFILLMENT CO shall allow premises inspection for insurance agents in order to assist you in obtaining coverage.",
        ],
      },
      {
        heading: "4.4 No Insurance",
        paragraphs: [
          "You can choose not to insure your inventory. In this event, EASTERN FULFILLMENT CO will, under no circumstances will be liable for any loss or damage to the inventory stored at EASTERN FULFILLMENT CO facilities.",
        ],
      },
    ],
  },
  {
    id: "storage-and-inventory",
    number: "5",
    title: "Storage and Inventory Management",
    clauses: [
      {
        heading: "5.1 Inbound Shipment",
        paragraphs: [
          "It is your responsibility to create Inbound Shipment of any products being sent to Eastern Fulfillment co warehouse facilities via Eastern Fulfillment co Dashboard (instruction to use Eastern Fulfillment coGo dashboard will be provided upon your acceptance of EASTERN FULFILLMENT CO as their service partner). Eastern Fulfillment co may refuse, reject or hold inventory for further processing if Inbound shipment is non compliant to Eastern Fulfillment co standards. ($50/day holding fee will apply to all non-complaint inbound shipments).",
        ],
      },
      {
        heading: "5.2 Inventory Receiving",
        paragraphs: [
          "Eastern Fulfillment co accepts all the inbound shipment during 10:00 AM – 4:30 (respective to warehouse local time zone) between Monday to Friday. Upon receiving at Eastern Fulfillment co Facilities shipment is inspected for compliance with Eastern Fulfillment co receiving standards. All products shipped to EASTERN FULFILLMENT CO must be received in Ready – to – Ship format unless an arrangement has been made with Eastern Fulfillment co Representative.",
        ],
      },
      {
        heading: "5.3 Inventory Processing",
        paragraphs: [
          "Eastern Fulfillment co shall compare the Inbound pallet / case quantities listed on the WRO (Warehouse Receiving Order) with Eastern Fulfillment coGo Dashboard and the actual goods physically received by our warehouse team but will not verify the quantities inside each individual case/pallet delivered you will be notified of any discrepancies or any exterior / physical damage observed upon receiving of the products.",
        ],
      },
      {
        heading: "5.4 Delivery by Appointment",
        paragraphs: [
          "It is the company responsibility to update the estimated arrival date along with the tracking number when creating an inbound shipment at Eastern Fulfillment coGo Dashboard. All LTL / truckload / Full Containers carriers are required to make an appointment 48 hours prior to the delivery with the Eastern Fulfillment co Facilities. EASTERN FULFILLMENT CO will not be liable for any fees associated with refused shipments.",
        ],
      },
      {
        heading: "5.5 Inbound Labeling",
        paragraphs: [
          "All inbound Pallets/cases require to affix WRO label obtainable from Eastern Fulfillment coGo Dashboard which includes. Customer Name, SKU, Description, Units per case, Total Quantity.",
        ],
      },
      {
        heading: "5.6 Storage",
        paragraphs: [
          "EASTERN FULFILLMENT CO offers two storage options. Each SKU requires its own separate storage space to ensure an accurate pick & pack process. Storage is charged on the 1st weekday of the calendar month. Products received after 15th will be charged prorated storage. Eastern Fulfillment co accepts and Store all standard 48x40” pallets at their facilities with maximum height not to be exceeding 48”. Products requiring less than a pallet space will be stored with IHS (In House Storage System) Eastern Fulfillment co will access storage at its sole discretion.",
        ],
      },
      {
        heading: "5.7 Inventory Counts / Management",
        paragraphs: [
          "All Inventory counts are available at Eastern Fulfillment coGo dashboard are Live counts and monitored via random cycle counts. Eastern Fulfillment co does not hold records of past inventory on its servers. As described in the receiving processes above, the Products are not counted by individual pieces upon arrival (unless otherwise specified). EASTERN FULFILLMENT CO shall not be responsible for any variance in the total volume of any Product held in inventory unless such variance exceeds 5% of the total volume of such Product (per sellable-SKU) against the last total Product volume amount last communicated via Eastern Fulfillment coGo online portal. Additional or annual physical inventory counts can be scheduled on request and will incur an additional cost at the rate of $40 per man hour.",
        ],
      },
      {
        heading: "5.8 Inventory Count Inaccuracies",
        paragraphs: [
          "IN THE EVENT OF INVENTORY LOSS DUE TO INVENTORY COUNT INACCURACIES, YOU AGREE THAT IT WILL BE CONSIDERED AN “INVENTORY LOSS” AND IN NO EVENT SHALL Eastern Fulfillment co BE LIABLE.",
        ],
      },
    ],
  },
  {
    id: "fulfillment-services",
    number: "6",
    title: "Fulfillment Services",
    clauses: [
      {
        heading: "6.1 Shipping with EASTERN FULFILLMENT CO",
        paragraphs: [
          "All orders will ship using the carrier and service level selected by EASTERN FULFILLMENT CO in its reasonable discretion based on the shipping method that is provided via API or Webhook from your integrated web store/Marketplace. You will be billed for packing materials if shipping dimensions exceed 12” of the product. If the Product does not require any additional packaging, shipping label and the packing slip will be applied to the exterior of the Product.",
        ],
      },
      {
        heading: "6.2 Shipping Times",
        paragraphs: [
          "Based upon the dimensions and final destination of the final packaged shipment, Eastern Fulfillment co shall use its Order Management System to browse through the following carriers: United Parcel Service, Inc. (“UPS”), FedEx Corporation (“FedEx”), United States Postal Service (“USPS”) and DHL eCommerce (“DHL”) (each, individually, a “Carrier,” and collectively, the “Carriers”), to find the lowest shipping rate for the most reliable shipping option for the desired speed.",
          "(A) All orders are shipped with standard 1-3 days anywhere in the U.S. All orders will be fulfilled the same day if received by 1:30 PM EST. All Overnight/expedited shipping requests must be specified on the order.",
          "(B) Eastern Fulfillment co is not liable for shipping delays due to unforeseen circumstances. This can include natural disaster, carrier demand or disputes, domestic or international customs embargo, or seasonal shipping demand.",
          "(C) Special or custom orders may require additional lead time. For large items that require Freight shipping a valid phone number is required to call and schedule your delivery.",
        ],
      },
      {
        heading: "6.3 Shipping / Service Costs",
        paragraphs: [
          "Price Quotes for the Services and Service Fees are for informational purposes only, are subject to change, and shall not under any circumstances be binding upon EASTERN FULFILLMENT CO. Quotations accepted through our online interface are estimates based on the best information available from prior records. The final rates and Service Fees may vary based upon the Goods actually tendered, the work actually performed, or a number of factors such as carrier shipping prices. EASTERN FULFILLMENT CO reserves the right to bill the Service Fees based on actual charges at any time after the Services are rendered. EASTERN FULFILLMENT CO specifically disclaims liability for any shipping rate errors due to inaccurate or incomplete information provided to it, such as dimensions and weights.",
        ],
      },
      {
        heading: "6.4 International Shipments",
        paragraphs: [
          "You authorize EASTERN FULFILLMENT CO to export the goods on your behalf. Further, you agree that EASTERN FULFILLMENT CO may delegate the obligation to import the goods on your behalf to a subcontractor. It is your responsibility to reimburse EASTERN FULFILLMENT CO for all applicable taxes & duties for imported goods in addition to the purchase price of the goods and any other applicable costs related to the shipment.",
        ],
      },
      {
        heading: "6.5 Verified Shipping Addresses",
        paragraphs: [
          "Eastern Fulfillment co shall not be responsible for any fees or reimbursements resulting from incorrect or incomplete information contained in any order (including a mail hold) Eastern Fulfillment co Do not ship to PO Boxes, Eastern Fulfillment co will not be held responsible if order was non deliverable at PO Box.",
        ],
      },
      {
        heading: "6.6 Reimburse / Refund Policy",
        paragraphs: [
          "Any reimbursements or guarantees provided for incorrect/missing shipments are provided as a commitment to a quality level of service by EASTERN FULFILLMENT CO. Eastern Fulfillment co will cover the shipping cost for any mistake occurring by EASTERN FULFILLMENT CO during operation. Reimbursements or credits of these fees are credited to your account and cannot be redeemed for cash value.",
        ],
      },
      {
        heading: "6.7 Shipping Delays",
        paragraphs: [
          "During holidays or peak shipping seasons, you agree to provide Eastern Fulfillment co with additional lead time to process orders. During such peak shipping seasons, you agree that any guaranteed shipping deadlines or reimbursements during these times will be extended up to 3 business days.",
        ],
      },
      {
        heading: "6.8 Damages and Claims",
        paragraphs: [
          "Any order discrepancies must be reported to the carrier within 24 hours after delivery. All orders leave our warehouse verified in good condition. If products shipped appear to be opened, re-taped, damaged, or tampered with in any way, you must keep the original boxes and file a claim with the shipping carrier. EASTERN FULFILLMENT CO holds no responsibility for credits or claims once parcels have been tendered to a shipping carrier. You must agree that not all claims will be refunded unless approved by the third-party shipping carrier.",
        ],
      },
      {
        heading: "6.9 Canceled or Modified Orders",
        paragraphs: [
          "Orders that are canceled or modified after fulfillment has been completed will be subject to a $50 charge to locate the package, void the shipping label and restock the item(s). Orders that are canceled or modified after the package has been collected by the carrier will be subject to a $75 fee to attempt to re-route the shipment back to our facilities or any other address than originally intended. This does not guarantee that the package will be returned to our facilities or delivered to any other address.",
        ],
      },
    ],
  },
  {
    id: "product-return",
    number: "8",
    title: "Product Return",
    clauses: [
      {
        heading: "8.2 Return Processing",
        paragraphs: [
          "Once the package is received at our warehouse facility, Eastern Fulfillment co shall examine returned packages for content completeness, and if, in its sole discretion and determination, a returned package contains good components and will be restocked to inventory for future fulfillment use. Goods that are determined to be damaged or unsellable will be discarded/disposed of and cannot be retrieved.",
        ],
      },
      {
        heading: "8.3 Non-Fulfillment Returns",
        paragraphs: [
          "All non-fulfillment / Amazon return customers must create an inbound product request. Any products arriving to our warehouse without the process will be discarded and cannot be retrieved. a $2.50 processing and handling fee will be charged to all the incoming product quantities.",
        ],
      },
    ],
  },
  {
    id: "termination",
    number: "9",
    title: "Termination of Agreement",
    clauses: [
      {
        heading: "9.1 Terms",
        paragraphs: [
          "(A) You have the right to terminate this Agreement at any time, provided you do not have a balance due and owing, by sending a termination request to support@Easternfulfillment.com.",
          "(B) EASTERN FULFILLMENT CO may terminate, at its discretion and without cause, this Agreement at any time by providing thirty (30) days prior notice to the administrative email address associated with your Account. In addition, EASTERN FULFILLMENT CO may also terminate this Agreement upon ten (10) days’ notice in the case of nonpayment if you breach any of the terms or conditions of this Agreement.",
          "(C) The termination of this Agreement shall constitute a termination of any Service Level Agreement or Volume Agreement. EASTERN FULFILLMENT CO reserves the right to immediately modify, suspend or discontinue, temporarily or permanently, the Services (or any part thereof) if you are in breach of this Agreement. All of Your Content (if any) may be permanently deleted by EASTERN FULFILLMENT CO upon any termination of your account in EASTERN FULFILLMENT CO sole discretion. However, all rights to payment shall survive termination or expiration of this Agreement.",
        ],
      },
      {
        heading: "9.2 Effects of Termination",
        paragraphs: [
          "(A) In the event of termination of this Agreement, all fees due and payable by you, together with all sums then outstanding, shall become immediately due. You will be responsible for paying any Services rendered until all Products are removed from EASTERN FULFILLMENT CO facilities including monthly fees, storage fees, administrative fees and product-removal fees.",
          "(B) You agree to remove all Products from EASTERN FULFILLMENT CO Facilities within 30 days of termination of this Agreement. In the event that your products are not timely removed, you must agree that such products will be considered abandoned by you and EASTERN FULFILLMENT CO may, in its sole and discretion, will start removal/ disposal process for products in any manner without further liability or obligation to you; and you shall promptly reimburse for any reasonable fees incurred for such removal and disposal process.",
          "(C) In the event of termination of this Agreement, EASTERN FULFILLMENT CO agrees to work in good faith with you to assist in transition to use another fulfillment services partner.",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    number: "10",
    title: "Intellectual Property Rights",
    clauses: [
      {
        heading: "10.1 EASTERN FULFILLMENT CO Property",
        paragraphs: [
          "For purposes of this Agreement, “EASTERN FULFILLMENT CO Property” shall mean (a) EASTERN FULFILLMENT CO’s methodology for the provision of the Services; and (b) EASTERN FULFILLMENT CO’s Confidential Information. EASTERN FULFILLMENT CO hereby retains all worldwide right, title and interest in and to the EASTERN FULFILLMENT CO Property. Any rights not expressly granted herein to the EASTERN FULFILLMENT CO Property shall be retained by EASTERN FULFILLMENT CO. Company acknowledges that all right, title and interest to the EASTERN FULFILLMENT CO Property is owned by EASTERN FULFILLMENT CO.",
        ],
      },
      {
        heading: "10.2 Additional Restrictions",
        paragraphs: [
          "Other than as permitted herein, Company shall not (and shall not permit others), directly or indirectly, to modify, to translate, to decompile, to disassemble, or to reverse engineer any part of the EASTERN FULFILLMENT CO Property, or otherwise to attempt to discern the functioning or operation of the website or the Services; or to copy, to rent, to lease, to distribute, or to otherwise transfer any of the rights Company receives hereunder.",
        ],
      },
      {
        heading: "10.3 Client Property",
        paragraphs: [
          "No Confidential Information obtained by EASTERN FULFILLMENT CO from Company shall become EASTERN FULFILLMENT CO Property. All materials provided by Company shall be deemed “Client Property” for purposes of this Agreement. Company grants EASTERN FULFILLMENT CO a non-exclusive license to the Client Property solely as needed to provide the Services.",
        ],
      },
      {
        heading: "10.4 Data Security",
        paragraphs: [
          "The Services are currently provided from the United States. Registration Information, Account data, information and other data (“Data”) is currently stored and processed in the United States. EASTERN FULFILLMENT CO has implemented and will maintain appropriate physical, electronic, and managerial procedures intended to protect against the loss, misuse, unauthorized access, alteration or disclosure. These measures include encryption of Data during transmission of the Service and encryption of backups of Data and authentication credentials at rest. EASTERN FULFILLMENT CO will use commercially reasonable efforts to promptly notify Company of any unauthorized Account access to, or use of, Data that comes to EASTERN FULFILLMENT CO’s attention. Company agrees to immediately notify EASTERN FULFILLMENT CO of any suspected security breach at info@EasternFulfillmentcopress.com, followed by contacting EASTERN FULFILLMENT CO management.",
        ],
      },
      {
        heading: "10.5 Third Party Software",
        paragraphs: [
          "Any third-party software application Company uses on the EASTERN FULFILLMENT CO website, to connect to the Services, or related to the Services (“Third Party Software”) is solely subject to any third-party software provider software licenses. EASTERN FULFILLMENT CO does not own, control or have any responsibility or liability for any Third-Party Software.",
        ],
      },
    ],
  },
  {
    id: "indemnity",
    number: "11",
    title: "Indemnity",
    clauses: [
      {
        heading: "11.1 Indemnification",
        paragraphs: [
          "Subject to the terms and conditions of this Agreement, Company shall indemnify, defend and hold harmless EASTERN FULFILLMENT CO and its representatives/officers, directors, employees, agents, affiliates, successors and permitted assigns (collectively, “Indemnified Party”) against any and all losses, damages, liabilities, deficiencies, claims, actions, judgments, settlements, interest, awards, penalties, fines, costs, or expenses of whatever kind, including attorneys’ fees, fees and the costs of enforcing any right to indemnification under this Agreement and the cost of pursuing any insurance providers, incurred by Indemnified Party or End-User (collectively, “Losses”), arising out or resulting from any claim of a third party alleging:",
        ],
        list: [
          "breach or non-fulfillment of any representation, warranty or covenant under/representation or warranty set forth in this Agreement by Company.",
          "any negligent or more culpable act or omission of Company (including any recklessness or willful misconduct) in connection with the performance of its obligations under this Agreement.",
          "any bodily injury, death of any person or damage to real or tangible personal property caused by the willful or grossly negligent acts or omissions of Company.",
          "the acts or omissions (including, without limitation, any negligence or willful misconduct) of any third party whether or not selected by or retained by EASTERN FULFILLMENT CO.",
          "any failure by Company to substantially comply with an applicable Food and Drug Administration (FDA) or other governmental requirement; or",
          "any failure by the Company to comply with any applicable state, federal or international laws.",
        ],
      },
    ],
  },
  {
    id: "data-protection",
    number: "12",
    title: "Data Protection",
    clauses: [
      {
        paragraphs: [
          "By accepting this Agreement (whether by electronic means or otherwise), the Recipient hereby consents to the holding and processing of personal data provided by him/ her to the Eastern Fulfillment co for all purposes necessary for the operation of the Plan.",
        ],
      },
    ],
  },
  {
    id: "force-majeure",
    number: "13",
    title: "Force Majeure",
    clauses: [
      {
        paragraphs: [
          "EASTERN FULFILLMENT CO shall not be liable for any failure or delay in performance hereunder which may be due, in whole or in part, to fire, explosion, earthquake, storm, flood, drought or other adverse weather condition, accident, casualty, breakdown of machinery or facilities, strike, lockout, combination of workmen or other labor difficulties (from whatever cause arising, and whether or not the demands of the employees are reasonable or within EASTERN FULFILLMENT CO’s power to grant), war, civil disturbance, acts of terrorism, insurrection, riot, act of God or the public enemy, law, act, order, proclamation, decree, regulation, ordinance, instruction or request of Government or other public authorities, judgment or decree of a court of competent jurisdiction, delay or failure of carriers, shippers or contractors, labor shortage or inability to obtain transportation, equipment, operating materials, plant equipment or materials required for our performance, curtailment or suspension of operations to remedy or avoid an actual or alleged violation or violations of Federal, State or local law, as may be in effect from time to time during the Agreement period, or any contingency or delay or failure or cause of any nature beyond the reasonable control of EASTERN FULFILLMENT CO, whether or not of the kind hereinabove specified and whether or not any such contingency is presently occurring or occurs in the future. EASTERN FULFILLMENT CO shall give notice of any force majeure event as soon as reasonably practicable by giving notice to your administrative email account.",
        ],
      },
    ],
  },
  {
    id: "changes-to-terms",
    title: "Changes to Terms",
    clauses: [
      {
        paragraphs: [
          "EASTERN FULFILLMENT CO may change or revise this Agreement at our discretion. If any change or revision to this Agreement is not acceptable to you, your only remedy is to stop using our Services and send a cancellation email to support@Easternfulfillment.com. Otherwise, you will be bound by the changed or revised terms. EASTERN FULFILLMENT CO may change or revise this Agreement from time to time by providing ten (10) days prior notice either by emailing the email address associated with your account or by posting a notice on the Eastern Fulfillment coGo Dashboard. You can review the most current version of this Agreement at any time here or by logging into your account. Your use of the Services ten (10) days after this Notice shall constitute full acceptance of the revised or changed terms.",
        ],
      },
    ],
  },
];
