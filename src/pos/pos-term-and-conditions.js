import React,{useState,useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Time from './getTime';
import axios from 'axios';
import CrmforPosService from '../config/index';

function PosTerms() {
    const history = useLocation();
    const redirectPage = useHistory();
    const [data,setData] = useState([])
    useEffect(() => {
       setData(history.state)
    }, [history])
    const [checked,setChecked] = useState(false);
    const onCheckHandler = ()=>{
        setChecked(value=>!value)
    }
    const date = new Date();
    const month = date.toLocaleDateString('en-GB',{month:'long'}).toString()
    const day = date.getDate().toString();
    const year = date.getFullYear().toString();
    let from=2021,to=2024;
    let fromDate = new Date(`2021-05-31`);
    let toDate = new Date(`${fromDate.getFullYear()+3}-05-30`);
    // console.log(date.toDateString(),toDate.toDateString())
    if(date.toDateString() === toDate.toDateString()){
        fromDate = new Date(`${date.getFullYear()}-05-31`);
        toDate = new Date(`${date.getFullYear()+3}-05-30`);
        from = fromDate.getFullYear();
        // console.log(from)
        to = toDate.getFullYear();
        // console.log(to)
    }
    const onSubmitHandler=()=>{
        axios.post(CrmforPosService.CrmforPosService.baseURL + `/api/pos/register/details`, data)
            .then(res => {
                if(res.data === 'successfully inserted'){
                    window.alert('Successfully Added');
                    redirectPage.replace('/')
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="container-fluid" style={{ textAlign: 'justify',fontFamily:' font-family: Arial, Helvetica, sans-serif' }}>
            <h5 className="text-center my-2">AGREEMENT</h5>
            <div className="container">
                <p>Agreement of Appointment and engagement, by LMV Insurance Broking Services Private Limited, for implementation of IRDAI guidelines/ circular no.
                    IRDA/Int/GDL/ORD/183/10/2015 dated 26th October 2015, followed by IRDAI circular; IRDA/Int/GDL/ORD/047/03/2016 dated 11/3/2016 (amended from time
                    to time) and consequential compliance obligations of the Point of Sales (POS) Person vis- à-vis-LMVIBS
                </p>
                <p>This Agreement ("Agreement") dated <u>{`${day}-${month}-${year} `}{Time(date)}</u>, (“Effective date”) for Point Of Sales Person ("POS" ) and LMV Insurance Broking Services Private Limited
                    (Thereafter referred to as LMVIBS), sets forth the terms and conditions under which POS shall perform certain services for the Company. POS and Company may
                    also be referred to individually as a “party” and together as the "parties."
                </p>
                <p>WHEREAS, The Company is a direct Insurance Broker registered by IRDAI vide registration No 662 valid w.e.f. 31.05.{from} to 30.05.{to} and renewable thereafter
                    from time to time.</p>
                <p>WHEREAS, Company wishes to contract with POS to solicit the Insurance products, as may be specified by IRDAI from time to time, on the terms and conditions
                    provided for herein</p>
                <p>WHEREAS, POS desires to enter into an Agreement with Company for the solicitation of such Insurance product/products.</p>
                <p>WHEREAS, The Company appoints the POS for the purpose of selling and servicing of Insurance policies on behalf of the Company, the Company reserves the right
                    to approve or disapprove the contracting of any such POS.
                </p>
                <p>The Company and the POS expressly agree that the POS is not an employee of the Company and shall be considered as an Independent contractor for the purpose
                    of this agreement. The POS shall not be reimbursed any expenses incurred under this agreement and shall identify their own work place, use own supplies and set
                    own work hours, all at no cost to the Company.
                </p>
                <p>NOW,in consideration of the mutual promises and covenants herein stated, and for other good and valuable consideration, the parties hereto agree as follows:</p>
            </div>
            <div className="container">
                <h6>1. APPOINTMENT</h6>
                <p>1.1 The Company hereby appoints POS to solicit, at its own expense, new and/or renewal applications for insurance contracts ("Policy" or "Policies").</p>
            </div>
            <div className="container">
                <h6>2. TRAINING AND QUALIFICATION REQUIREMENT FOR POST</h6>
                <p>2.1 The POS person shall be at least 10th pass or attain any other qualification IRDAI may prescribe from time to time.</p>
                <p>2.2 He shall be trained as per the regulatory requirements by the company.</p>
                <p>2.3 The fees for the online training and examination if applicable of the POS shall be paid by the company.</p>
                <p>2.3.1 The POS, in his capacity as POS, shall be responsible for assuring that all of its Producers, as well as the POS himself, comply with the following duties.</p>
                <p>2.4 The POS shall appear in the online examination conducted as per the regulations and as amended and advised from time to time.</p>
                <p>2.5 The POS at the time of signing of this agreement shall ensure that he /she has been certified to become a POS.</p>
            </div>
            <div className="container">
                <h6>3. DUTIES OF POS</h6>
                <p>3.1 The POS, in his capacity as POS, shall be responsible for assuring that all of its Producers, as well as the POS himself, comply with the following duties.</p>
                <p>3.2 POS will comply with all laws and regulations which relate to this Agreement and shall indemnify and hold the Company harmless for its failure to do so. POS
                    shall maintain in good standing, at its own cost, licenses required by all applicable statutes and regulations.</p>
                <p>3.3 POS may not solicit any business except mentioned and specified by the regulations and as amended from time to time</p>
                <p>3.4 POS will comply with the Company's rules and regulations relating to the solicitation of insurance business. As a material part of the consideration for the,
                    making of this Agreement by the Company, POS agrees that there will be made no representations whatsoever with respect to the nature or scope of the benefits of
                    the Policies sold except through and by means of the written material either prepared and furnished to POS for that purpose by the Company or approved in
                    writing by the Company prior to its use. POS shall have no authority and will not make any oral or written alteration, modification, or waiver of any of the terms or
                    conditions of any Policy whatsoever.
                </p>
                <p>3.5 POS warrants that POS will diligently and to the best of its ability ensure that the facts set forth by any applicant/prospect in any application it solicits are true and correct.</p>
                <p>3.6 POS will conduct itself so as not to affect adversely the business, good standing, and reputation of the Company.</p>
                <p>3.7 POS agrees not to employ or make use of any advertisement in which the Company's (or its affiliate's) name or its registered trademarks are employed without
                    the prior written approval and consent of the Company. Upon request of POS during the term of this Agreement, the Company shall make available for POS's use,
                    standard visiting cards and other material. POS may add, at POS's expense, to the standard advertising only its business name, business address, POS number and
                    telephone number, as provided for in the advertising. No deletions or changes in the advertising copy are permissible. POS shall act solely as an independent
                    contractor, of-course subject to the control and guidance of the company, and as such, shall have control on: all matters, its time and effort in the placement of the
                    Policies offered hereunder. Nothing herein contained shall be construed to create the relationship of employer and employee between POS and Company.</p>
                <p>3.8 POS shall indemnify and hold the Company and its officers,and employees harmless from all expenses, costs, causes of action, claims, demands, liabilities and
                    damages, including reasonable attorney's fees, resulting from or growing out of any unauthorized act or transaction or any negligent act, omission or transaction by
                    POS or employees of POS.
                </p>
                <p>3.9 No Prior Disciplinary or Criminal Proceedings. POS represents and warrants that he/she has never been convicted of any crime involving moral turpitude and
                    is not disqualified as per section 42D(5) of the Insurance Act and remains Fit and Proper.
                </p>
                <p>3.10 Change of Address. POS shall notify Company in writing of any change of address and/or communication at least thirty (30) days prior to the effective date of
                    such change.
                </p>
                <p>3.11 POS shall not engage or employ anyone as canvassers or agents for soliciting the insurance business.</p>
                <p>3.12 Collection of Premiums. POS shall have no authority, without written permission of Company, to collect or provide receipt for premiums to customer and
                    shall assist the client for compliance of section 64VB of the Insurance Act 1938. POS shall, on behalf of the Company and with the written permission of the company, collect premiums as per IRDAI norms. All premiums collected on business produced by the POS hereunder shall be submitted to the Company within
                    same day of receipt by POS.
                </p>
                <p>3.13 To faithfully perform all duties required hereunder, to cooperate with the Company in all matters pertaining to the issuance of policies, cancellations, claims
                    and to promote the best interest of the Company.</p>
                <p>3.14 POS will be bound not to work for any other intermediaries or the Insurance companies. Whatever work he does in the insurance space, POS is bound to do
                    through Company only.
                </p>
                <p>3.15 POS will ensure the compliance of FIU and obtain KYC</p>
                <p>3.16 POS shall not do any claim consultancy and any such opportunity that comes in this area. He shall be further obliged to bring to the notice of the company for
                    its further doing the needful in a professional manner.</p>
                <p>3.17 Any financial penalty levied by the IRDAI, if it is based on the violations and non compliance by the POS shall be borne by him. Similarly if suspension,
                    cancellation or withdrawal of license of the company is based on breaches/non compliance on the account of POS, the POS shall indemnify the consequential
                    losses to the company.
                </p>
                <p>3.18 The POS shall be duty bound to cooperate with the officers of IRDAI for the purpose of inspection as may be required by IRDAI inspectors or investigating
                    authority from time to time.
                </p>
            </div>
            <div className="container">
                <h6>4. DUTIES OF THE COMPANY</h6>
                <p>4.1 The duties of the Company shall vary depending upon the specific product being sold by POS. For all products, the Company will provide brochures and
                    proposal forms or make the same available online. The Company will deliver to the customer all insurance policies and related correspondence or similar
                    documents, in accordance with Company procedures. The Company shall respond in a reasonable and timely manner to inquiries and questions about the product.
                    The Company shall maintain reasonable accounting, administrative, and statistical records in accordance with prudent standards of insurance record keeping,
                    including premium, sale or effective date, and any other records needed to verify coverage, pay claims, or underwrite the company insurance products, of any
                    insured participant covered under the policies.</p>
                <p>4.2 The company shall provide administrative support including infrastructure to the POS to enable him to perform his obligation on the interest of Broking
                    Company and the customer whose business has been solicited.
                </p>
            </div>
            <div className="container">
                <h6>5.RESERVATIONS OF RIGHTS</h6>
                <p>5.1 The Company reserves the right to reject any and all applications for its Policies submitted by POS if they are not found to be of the order of merit required by
                    the customer or the company or the Insurance Company.
                </p>
                <p>5.2 The Company reserves the right to discontinue writing or offering any of the Policies which become subject to this Agreement upon sixty (60) days notice to
                    POS (or the number of days required by law in the POS's state of domicile).
                </p>
            </div>
            <div className="container">
                <h6>6.MAINTENANCE OF RECORDS</h6>
                <p>6.1 Company and POS each shall maintain records of transactions with individual insured.</p>
                <p>6.2 The Company, its employees, or authorized representatives may have unrestricted access to records and may audit, inspect and examine at reasonable times,
                    upon reasonable notice and during regular business hours at POS's place of business, all books and records,
                </p>
                <p>6.3 During the term of the Agreement, any extensions of it and for five (5) years thereafter, the Company shall strictly adhere to keeping the Confidential
                    information about the POS safe and private. The POS shall also adhere to keeping the Company Information Confidential, which also includes matter(s) - written or
                    unwritten, financial and accounting details, business production,methods of business operations,marketing,strategic planning or propritory information of any
                    kind or nature whatsoever, including the trade secrets. Confidential Information does not include information that: (i) is already known to the recipient at the time
                    of disclosure to it; (ii) is in the public domain or subsequently becomes publicly available; (iii) is provided to the recipient by a third party who is under no such
                    obligation of confidentiality; or (iv) is independently developed by the recipient. Each party shall take necessary and reasonable precautions to prevent
                    unauthorized disclosure of Confidential Information and shall require all of its officers, employees, and other personnel to whom it is necessary to disclose the
                    same, or to whom the same has been disclosed, to keep this Confidential Information private. It is understood, however, that certain "Confidential Information"
                    may be required to be filed with State and Central regulatory agencies in accordance with their reporting requirements. Neither party shall make use of the name
                    or service mark(s) of the other, including use of the name or service mark(s) of any marketing, enrollment, or other public relations material without prior written
                    approval of the other party.
                </p>
                <p>6.4 There shall be restriction on use of LMVIBS logo and letterhead by POS unless approved by LMVIBS in writing.</p>
            </div>
            <div className="container">
                <h6>7.COMPENSATION</h6>
                <p>7.1 Compensation for each policy written hereunder shall be made by the Company to POS in accordance with the regulation and as amended from time to time.</p>
                <p>7.2 Compensation due under this Agreement shall be paid to POS within 180 days from the end of each calendar quarter in which the Company receives premium
                    with respect to its Policies or as may otherwise be agreed upon in writing.
                </p>
                <p>7.3 Under all circumstances, the Company shall have the right to offset overpayments to POS against amounts due to POS.</p>
            </div>
            <div className="container">
                <h6>8. EFFECTIVE DATES, TERM AND TERMINATION</h6>
                <p>8.1 This Agreement shall commence on the effective date first stated above and shall continue in force until terminated pursuant to this Article. Upon termination,
                    all business produced by the POS shall remain in full force and effect until the natural expiration or prior cancellation of such business, and shall be subject to all
                    terms and conditions of this Agreement. Upon termination, the all data related to policy holder will be handed over to company by POS
                </p>
                <p>8.2 This Agreement will terminate automatically upon the occurrence of any of the following events by POS, and upon such occurrence the parties shall be
                    obligated to make only those payments the right to which accrued to the date of termination:
                </p>
                <p>8.2.1 Conviction of a felony by POS;</p>
                <p>8.2.2 Misappropriation (or failure to remit) any funds or property due the Company from POS;</p>
                <p>8.2.3 Determination that POS is not in compliance with Company underwriting guidelines or the terms of this Agreement and POS has failed to correct the problem within 10 days of the Company providing written notice of same;</p>
                <p>8.2.4 In the event of fraud or material breach of any of the conditions or provisions of this Agreement on the part of either party, the other party may terminate the
                    Agreement immediately upon written notice.</p>
                <p>8.2.5 Fails to comply with directions of the Company.</p>
                <p>8.2.6 Furnish wrong information or conceals the information or fails to disclose the material facts of the policy to the policy holder</p>
                <p>8.2.7 Fails to resolve complaints, unless the circumstances are beyond his control, emanating from the business procured by him and persons he deals with</p>
                <p>8.2.8 Indulges in inducement in cash or kind with client or any other insurance intermediary/agent/insurer.</p>
                <p>8.2.9 Fails to pay any penalty levied on his account.</p>
                <p>8.3.0 Fails to carry out his obligations as prescribed in the agreement and in the provisions of: Act/regulations/circulars or guidelines by IRDAI from time to time.</p>
                <p>8.3.1 Acts in a manner prejudice to the interest of the company or the client.</p>
                <p>8.3.2 Acts in a manner that amounts to diverting funds of his Group/Affiliates or associates rather than engaging in the activity of soliciting and servicing insurance
                    business.</p>
                <p>8.3.3 Is found guilty of fraud or is charged or convicted in any criminal act.</p>
                <p>8.3.4 In the event of a material breach by a party to this Agreement, the non-breaching party may terminate this Agreement after providing thirty (30) days written
                    notice to the breaching party to cure such breach. Upon such occurrence, a party shall be obligated to make only those payments the right which accrued to the
                    date of termination.</p>
            </div>
            <div className="container">
                <h6>9.GENERAL PROVISIONS</h6>
                <p>9.1 Failure of either party to insist upon the performance of any of the terms of this Agreement or to declare a forfeiture or termination in the event of nonperformance by the other party shall not constitute a waiver of performance required hereunder.</p>
                <p>9.2 No assignment, transfer or disposal of any interest that a party may have pursuant to this Agreement shall be made at any time without prior written approval
                    of the other party. Notwithstanding the foregoing, Company may assign any and all interests under this Agreement to a parent or affiliate, or due to merger or
                    acquisition without the consent of POS.
                </p>
                <p>9.3 This Agreement shall be binding upon the administrators and executors, successors and permitted assignees of the parties hereto.</p>
                <p>9.4 No Amendment or modification of this Agreement shall be valid, or of any force or effect, unless the same be in writing and acknowledged and signed by the Company and POS.</p>
                <p>9.5 Any disputes, claims or counterclaims arising from or relating to this Agreement shall be subject to the Jurisdiction of the courts in India with first preference
                    exercised to resolve by Alternative dispute resolution Indian system.
                </p>
            </div>
            <div className="container">
                <h6>10.INTELLECTUAL PROPERTY</h6>
                <p>The POS agrees, warrants and undertakes that it shall take steps to safeguard the company’s intellectual property rights, if in its possession or the company’s
                    Products, Services and software are not infringed, passed off, diluted, reverse- engineered, hacked into, misappropriated, tampered with and/or copied by the POS,
                    and/or its directors, officers, employees, agents, representatives, subsidiaries, associates, etc.</p>
            </div>
            <div className="container">
                <h6>11.INDEMNITY</h6>
                <p>The POS, shall at its own expense, indemnify, defend and hold harmless the company and its officers, directors, employees, representatives and agents, against any
                    third party claim, demand, suit, action, or other proceeding brought against the company or its officers, directors, employees, representatives or agents and against
                    all damages, awards, settlements, liabilities, losses, costs and expenses related thereto (including without limitation attorneys’ fees) to the extent that such claim
                    suit, action or other proceedings is based on or arises from any deficiency in service, by the POS, as per the scope of work or any other breach of terms of this
                    Agreement.
                </p>
            </div>
            <div className="container">
                <h6>12.COMPLIANCE WITH THE LAWS</h6>
                <p>Each party represents that it shall abide by and observes all applicable laws, rules, regulations.</p>
            </div>
            <div className="container">
                <h6>13. GOVERNING LAW AND DISPUTE RESOLUTION</h6>
                <p>Any dispute, controversy or claims arising out of or relating to this Agreement or the breach, termination or invalidity thereof, shall be settled by arbitration in
                    accordance with the provisions of the Arbitration and Conciliation Act, 1996. The Arbitral Tribunal shall compose of a sole arbitrator to be appointed by both the
                    Parties in mutual consent. The place of arbitration shall be Telangana and any award whether interim or final, shall be made, and shall be deemed for all purposes
                    between the parties to be made, in Telangana. The arbitral procedure shall be conducted in the English language and any award or awards shall be rendered in
                    English. The provisions of this Agreement shall be governed by and construed in accordance with Indian law. Only the courts at Telangana shall have exclusive
                    jurisdiction in all matters arising under this Agreement.
                </p>
            </div>
            <div className="container">
                <h6>14. SEVERABILITY</h6>
                <p>If any provision of this Agreement is held illegal or unenforceable by any court or other authority of competent jurisdiction, such provision shall be deemed
                    severable from the remaining provisions of this Agreement and shall not affect or impair the validity or enforceability of the remaining provision of this
                    Agreement.
                </p>
            </div>
            <div className="container">
                <h6>15. FORCE MAJEURE</h6>
                <p>Neither Party shall be under any liability for any failure to perform any of its obligations under this Agreement due to Force Majeure. For the purpose of this
                    clause, “Force Majeure” means fire, explosion, flood, Act of God, act of terrorism, war, rebellion, riots, or sabotage or events or circumstances which are wholly
                    outside the control of the party affected thereby. Where, such event continues to exist for a continuous period of 3 months or more, the Parties hereby agrees that
                    the Agreement shall stand terminated.
                </p>
            </div>
            <div className="form-check container">
                <input type="checkbox" value={checked} className="form-check-input" onChange={onCheckHandler}/>
                <label>This Agreement constitutes the entire Agreement between the parties with respect to its matter.<br />
                    IN WHERE OF, intending to be legally bound hereby, the parties hereto have executed this Agreement.
                </label>
            </div>
            <div className="container my-3">
               {checked ? <input type="submit" className="btn btn-primary" onClick={onSubmitHandler}/> : null} 
            </div>
        </div>
    )
}

export default PosTerms;
