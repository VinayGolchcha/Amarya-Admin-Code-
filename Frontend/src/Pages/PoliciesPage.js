// LoginPage.js
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PolicyTable from "../Components/PolicyTable";

const headingStyle = {
  margin: "2px 0px",
};
const boxHeading = {
  display: "inline-block",
  width: "auto",
  backgroundColor: "rgb(142, 141, 138)",
  color: "rgb(211, 213, 223)",
  padding: "6px",
  borderRadius: "6px",
  fontSize: "0.9rem",
};
const boxBody = {
  margin: "20px 0px",
  backgroundColor: "rgb(249, 248, 245)",
  padding: "15px 10px",
  borderRadius: "6px",
  fontSize: "0.9rem",
  boxShadow:
    "0px -10px 10px -10px rgb(205, 204, 202), -10px 0px 10px -10px rgb(205, 204, 202), 10px 0px 10px -10px rgb(205, 204, 202)",
};

const tableHeadersLeave = ["Dates", "Day", "Occasion"];

const tableContentLeave = [
  { dates: "26-Jan-24", day: "Friday", occation: "Republic Day" },
  { dates: "25-Mar-24", day: "Monday", occation: "Holi" },
  { dates: "15-Aug-24", day: "Thursday", occation: "Independence Day" },
  { dates: "02-Oct-24", day: "Wednesday", occation: "Gandhi Jayanti" },
  { dates: "31-Oct-24", day: "Thursday", occation: "Diwali" },
];
const tableHeadersAppraisal = [
  "Joining Period",
  "Joining Period",
  "Joining Period",
];
const tableContentAppraisal = [
  {
    firstQuarter: "January-June",
    secondQuarter: "October",
    thirdQuarter: "April",
  },
  {
    firstQuarter: "July-December",
    secondQuarter: "April",
    thirdQuarter: "October",
  },
];
const PoliciesPage = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          borderRadius: "10px",
          fontFamily: "Poppins",
          fontSize: "0.9rem",
        }}
      >
        <Typography
          sx={{
            margin: "12px 0px",
            width: "630px",
            height: "42px",
            fontFamily: "Poppins",
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "42px",
            color: "#121843",
          }}
        >
          Policies
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            lg={1}
            md={1}
            sm={2}
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgb(142, 141, 138)",
                height: "100%",
                width: "100%",
                color: "rgb(211, 213, 223)",
                padding: "15px",
                borderRadius: "6px",
              }}
            >
              <Box sx={{ margin: "8px 0px" }}>
                <p style={headingStyle}>T</p>
                <p style={headingStyle}>A</p>
                <p style={headingStyle}>B</p>
                <p style={headingStyle}>L</p>
                <p style={headingStyle}>E</p>
              </Box>
              <p style={headingStyle}>OF</p>
              <Box sx={{ margin: "8px 0px" }}>
                <p style={headingStyle}>C</p>
                <p style={headingStyle}>O</p>
                <p style={headingStyle}>N</p>
                <p style={headingStyle}>T</p>
                <p style={headingStyle}>E</p>
                <p style={headingStyle}>N</p>
                <p style={headingStyle}>T</p>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={11} md={11} sm={10} xs={9}>
            <Box
              sx={{
                backgroundColor: "rgb(249, 248, 245)",
                height: "100%",
                width: "100%",
                padding: "15px",
                borderRadius: "6px",
                boxShadow:
                  "0px -10px 10px -10px rgb(205, 204, 202), -10px 0px 10px -10px rgb(205, 204, 202), 10px 0px 10px -10px rgb(205, 204, 202)",
              }}
            >
              <ul style={{ marginTop: "0px" }}>
                <li>Welcome</li>
                <li>Purpose Of This Document Vision Statement</li>
                <li>Human Resource Policy</li>
                <li>Equal Employment Opportunity Policy</li>
                <li>Dress Code Policy</li>
                <li>Attendance Policy</li>
                <li>Leave Policy</li>
                <li>Learning And Develpment Policy</li>
                <li>Prevention And Sexual Harassment Policy</li>
                <li>Employee Separation Policy</li>
                <li>Corporate Social Responsibiliy Policy </li>
                <li>Energizing Work Relationships</li>
              </ul>
            </Box>
          </Grid>
        </Grid>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              WELCOME
            </Box>
          </Typography>
          <ul>
            <li>
              Welcome aboard! Our team is pleased to have you onboard . Your
              Exception skills will be a great addition to our team. We are
              excied that you have joined us and look forward to a long , happy
              and successful relationship . We believe that the strong group of
              peoples achieve and accomplish greater wonders than what one can
              achieve alone. This manual provides a general guideline on how we
              operate.
            </li>
          </ul>
        </Box>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              PURPOSE OF DOCUMEMTS
            </Box>
          </Typography>
          <ul>
            <li>
              Purpose of this Guide is to help everyone in our team to get to
              know more about the company and its benefit programs. All the
              plans, policies, and procedures described are simply intended as
              guidelines only and may change in specific situations. You are
              most welcome to share your ideas and doubts in case any.
            </li>
          </ul>
        </Box>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              VISION STATEMENT
            </Box>
          </Typography>
          <ul>
            <li>
              Work as a team to produce exceptional consulting experience for
              all stakeholders.
            </li>
          </ul>
        </Box>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              HUMAN RESOURCE POLICY
            </Box>
          </Typography>
          <ul>
            <li>
              AMARYA policies focus on promoting best practices and continuous
              improvement to enable the team to create exceptional experience
              and learning for all stakeholders.
            </li>
            <li>
              HR GOAL – To deliver its best service in the welfare of our team.
              Ensures effective utilization and maximum development of Human
              Resources.
            </li>
            <li>
              HR Strategy – Align company goals with HR goals by closely working
              with the teammates and the clients.
            </li>
          </ul>
        </Box>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              EQUAL EMPLOYMENT OPPORTUNITY POLICY
            </Box>
          </Typography>
          <ul>
            <li>
              Equal employment opportunity as a concept and philosophy is an
              essential element at our workplace.
            </li>
            <li>
              Providing equal opportunities for all qualified candidates and not
              discriminating against any job applicant on race, religion, creed,
              gender, age, place of origin, color, language, disability or
              financial status.
            </li>
            <li>
              Company provides a work environment that promotes mutual respect
              and values to its people.
            </li>
          </ul>
        </Box>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              DRESS CODE POLICY
            </Box>
          </Typography>
          <ul>
            <li>
              As long as you are wearing something, and your dress is not making
              your colleagues uncomfortable, it is acceptable.
            </li>
          </ul>
        </Box>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              ATTENDANCE POLICY
            </Box>
          </Typography>
          <ul>
            <li>
              Company’s Business year starts from January and ends in December.
            </li>
            <li>Every week Monday to Friday.</li>
            <li>
              In case someone is coming late / not attending the office, s/he
              needs to inform his/her reporting manager, HR and client well in
              advance via mail.
            </li>
            <li>
              The working hours may overlap with the Company’s global
              clients/offices as required by business.
            </li>
            Holidays:
            <li>
              We require all our teammates to work 5 days a week, and keep
              Saturdays & Sundays as off days.
            </li>
            <li>
              Annually, the different National, Public and Festive Holidays will
              be decided by the company and will be informed prior to everyone.
            </li>
            <li>Holidays declared by the company for the year 2024 are:</li>
            <PolicyTable
              tableHeaders={tableHeadersLeave}
              tableContent={tableContentLeave}
            />
            <li>
              In case of any sudden holidays declared by the government due to
              various reasons will be declared holiday by the company as well.
            </li>
             
          </ul>
        </Box>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              LEAVE POLICY
            </Box>
          </Typography>
          <ul>
            <li style={{ fontWeight: "600" }}>Employee Leave Policy</li>
          </ul>
          <ol>
            <li>Casual Leaves: 15 paid leaves available in a year</li>
            <ol type="i">
              <li>
                {" "}
                Employees are granted 1.25 days of leave per month, and any
                usage exceeding this limit in the same month necessitates
                manager approval. Unused leave within the 1.25-day allocation
                can be carried forward to the next month. However, surpassing
                the allotted leave will lead to a negative leave balance, which
                will be adjusted from the leave balance in the following month.
              </li>
              <li>
                Maximum 5 paid leaves will be carry forwarded to next year i.e,
                each employee will get minimum 15 paid leaves and maximum 20
                paid leaves.
              </li>
              <li>
                Any new employee joining on or after 15th of any month will not
                be entitled to any paid leave for that month.
              </li>
            </ol>
            <li>
              Sick Leaves: Each employee will get 3 days of paid sick leave.
              More than 3 days will require the submission of a medical
              certificate. These leaves will be availed only after manager’s
              approval.
            </li>
            <li>
                Marriage Leaves: 10 days of paid leaves once in a life time of
              the employment.
            </li>
            <li>
              {" "}
              Bereavement leave: In the unfortunate event of the passing of an
              immediate family member or (including mother, father, wife,
              children, and dependent siblings), employees are entitled to 3
              days of bereavement leave on manager’s approval.
            </li>
            <li>
              {" "}
              Maternity Leaves: Female employees are entitled to a total of 26
              weeks of paid maternity leave during the 1st and 2nd pregnancies.
              This includes leave taken immediately before the expected date of
              delivery.
            </li>
            <li>
              {" "}
              Paternity Leaves: Male employees are granted 5 days of paid leave
              after the birth of the 1st and 2nd child.
            </li>
            <li>
              Family Care giving Leave: 3 days of paid leave for any family
              emergency on manager’s approval.
            </li>
          </ol>
          <ul>
            <li style={{ fontWeight: "600" }}> Intern Leave Policy</li>
          </ul>
          <ol>
            <li>
              {" "}
              Every intern will get 1 leave per month during his/her internship.
              Extended leaves will be granted for specific reasons on manager’s
              approval. Unannounced absence will result in termination of
              internship.
            </li>
          </ol>
          <ul>
            <li style={{ fontWeight: "600" }}>Leave Encashment Policy</li>
          </ul>
          <ol>
            <li>
              At the conclusion of the year, any remaining leave balance,
              following the carry-forward of 5 leaves to the next year, will be
              converted into cash, up to a maximum of 5 leaves.
            </li>
          </ol>
        </Box>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              LEARNING AND DEVELOPMENT POLICY
            </Box>
          </Typography>
          <ul>
            <li style={{ fontWeight: "600" }}>Organization Development</li>
          </ul>
          <ol>
            <li>
              We encourage and invest in learning & development of its talent
              resources. 
            </li>
            <li>
              Here, we encourage continuous learning and upgrading skills, thus
              helping in increasing one’s own potential.
            </li>
            <li>
              Everyone is required to undergo behavioral & technical training
              for his/her development in a year.
            </li>
            <li>
              Training, seminars / conferences / workshops that are relevant may
              be conducted.
            </li>
            <li>
              As part of our team, you can also share your views and ideas about
              any training/skills that will be beneficial for the company.
            </li>
          </ol>
        </Box>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              APPRAISAL POLICY
            </Box>
          </Typography>
          <ul>
            <li>
              <b>For Freshers</b>: Fresher joining us as an employee will get
              appraisal twice in a year- April and October. They will be
              eligible for increment for increment only when they have completed
              at least 3 months before that increment cycle. Please refer chart
              below for clarity:
            </li>
            <PolicyTable
              tableHeaders={tableHeadersAppraisal}
              tableContent={tableContentAppraisal}
            />
          </ul>
          <ul>
            <p>After these two increments they will fall under yearly cycle.</p>
          </ul>
          <ul>
            <li>
              <b>For Existing / Experienced</b>: Employees joining at any time
              of the year will get appraisal in the month of April if they have
              completed at least 3 months before that increment cycle (Joined by
              31st December last year).
            </li>
            <li>
              <b>Existing Employees (Transition to above cycle)</b>: Increments
              will be given as per their current running cycle and then adjusted
              to above half-yearly/yearly cycles. For e.g. (see below cases)
            </li>
          </ul>
          <ol>
            <li>
              For non-fresher, if increment is due in May-24 then after that
              increment next one will be done in April-25. 
            </li>
            <li>
              For fresher, if increment is due in May-24 then after this
              increment will be done in October-24 (if May increment was 1st) or
              April-25 (if May increment was 2nd). 
            </li>
            <li>
              For fresher, if increment is due in Aug-24 then after this
              increment will be done in April-25 (as there is less than three
              months’ time before October increment cycle
            </li>
          </ol>
        </Box>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              PREVENTION OF SEXUAL HARASSMENT POLICY
            </Box>
          </Typography>
          <ul>
            <li style={{ fontWeight: "600" }}> Introduction</li>
          </ul>
          <ol>
            <li>
              This policy has been framed in accordance with the provisions of
              “The Sexual Harassment of Women at Workplace (Prevention,
              Prohibition and Redressal) Act 2013 and the rules framed
              thereunder.
            </li>
          </ol>
          <ul>
            <li style={{ fontWeight: "600" }}>Preamble</li>
          </ul>
          <ol>
            <li>
              It has always been the goal of the AMARYA BUSINESS CONSULTANCY, to
              promote a workplace that is safe and secure for all the employees
              working under. The Company will not tolerate any form of
              harassment or discrimination.
            </li>
            <li>
              The above policy on Sexual Harassment of Women at Workplace is
              intended to provide female workers protection at workplace so that
              they work freely and efficiently.
            </li>
          </ol>
          <ul>
            <li style={{ fontWeight: "600" }}>Harassment Types</li>
          </ul>
          <ol>
            <li>
              <b>VERBAL HARASSMENT</b> - Such as jokes, epithets, negative
              stereotyping and unwelcome remarks about an individual's body,
              colour, physical characteristics, appearance, questions about a
              person's sexual practices or personal activities, sexual advances
              and remarks.
            </li>
            <li>
              <b>VISUAL HARASSMENT</b> - Such as offensive or obscene
              photographs, calendars, posters, cards, cartoons, drawings, and
              gestures, display of sexually suggestive objects and unwelcome
              notes placed on bulletin boards, computers or elsewhere.
            </li>
            <li>
              <b>PHYSICAL HARASSMENT</b> - Such as physical interference with
              normal work, impeding or blocking movement, assault, unwelcome
              physical contact, staring at a person’s body, and threatening.  
            </li>
            <li>
              Sexual harassment includes harassment of women by men, of men by
              women, and same-sex gender-based harassment.  
            </li>
            <li>
              Company will not tolerate such misconduct either by its members or
              someone outside
            </li>
            <li>
              Company does not tolerate sexual harassment of its team members,
              specifically, no person shall be subject to a team member’s
              unwelcome sexual advances or intimidating or harassing behavior,
              or condition an individual's employment or continued employment on
              submitting to such advances or behavior.
            </li>
            <li>
              Awareness of this policy with all team members is a must and
              assuring them that they will not have to endure insulting,
              degrading or exploitative sexual treatment or intimidating or
              harassing behavior. It also includes identifying offensive
              behavior in violation of this policy and bringing it to the
              attention of HR.
            </li>
            <li>
              Any employee who experiences or feels that s/he has been subjected
              to sexual harassment should report the alleged charge
              immediately. 
            </li>
            <li>
              If it is determined after the investigation that sexual harassment
              has, in fact taken place, stringent disciplinary action will be
              taken against the person or persons responsible.
            </li>
          </ol>
        </Box>
        <Box sx={boxBody}>
          <Typography sx={{ textAlign: "center" }}>
            <Box component="span" sx={boxHeading}>
              SEPARATION POLICY
            </Box>
          </Typography>
          <ul>
            <li style={{ fontWeight: "600" }}> Voluntary termination</li>
          </ul>
          <ol>
            <li>
              Any member, who wishes to leave the services of the company, has
              to submit a resignation letter to his/her immediate manager and a
              copy of the same to the Human Resource function at least 2 months
              in advance.
            </li>
            <li>
              Final notice period would be at sole discretion of the company.
            </li>
            <li>
              On acceptance of resignation, a communication in writing shall be
              given to the member with a copy to Accounts for his/her full and
              final settlement of dues.
            </li>
            <li>
              Further, the acceptance of your resignation solely depends on the
              Company.
            </li>
          </ol>
          <ul>
            <li style={{ fontWeight: "600" }}>Involuntary Termination</li>
          </ul>
          <ol>
            <li>
              After confirmation of your employment,the Company may terminate
              your employment at any time, on non-performance grounds or
              negligence in the performance of your duties, wrong information
              provided by you, improper character or attitude, integrity issues,
              or any other reason that the company believes are unsuitable.
            </li>
          </ol>
          <ul>
            <li style={{ fontWeight: "600" }}> Separation Process</li>
          </ul>
          <ol>
            <li>You shall send the resignation to the HR.  </li>
            <li>
              Once the resignation has been accepted, a confirmation email will
              be sent to you by the HR.
            </li>
            <li>
              In certain separation cases, management may postpone the relieving
              date considering the business need or due to non-completion of
              pending tasks by you.
            </li>
            <li>
              All files, documents (hard copy or electronic) and other company
              properties present with you shall be handed over.
            </li>
            <li>
              HR will communicate the Separation Process, and send the forms to
              you by email.
            </li>
            <li>
              You are not to make any kind of negative statements about the
              company or shall try to damage the reputation of the Company. 
            </li>
            <li>
              After verification of the documents by the HR, the separation
              process will be completed.
            </li>
          </ol>
        </Box>
      </Box>
    </>
  );
};

export default PoliciesPage;
