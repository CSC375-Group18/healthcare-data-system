import React from 'react';
import { motion } from 'framer-motion';
import '../ProjectWebsite.css';

import TeamCard from '../components/TeamCard';
import p1 from '../assets/blank.png';
import p2 from '../assets/blank.png';
import p3 from '../assets/blank.png';
import p4 from '../assets/blank.png';
import p5 from '../assets/blank.png';
import p6 from '../assets/team1.png';

const Card = ({ children }) => <div className="card">{children}</div>;

export default function Home() {
  return (
    <div className="site">
      {/* <header className="site__header">
        <div className="site__brand">
          <ShieldCheck size={18} />
          <span>HealthData Solutions Inc.</span>
        </div>
      </header> */}

      {/* Hero */}
      <div className="hero">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero__title"
        >
          CSC 375 – Project Website
        </motion.h1>
        <p className="hero__subtitle">
          Modernizing reporting for a Regional Healthcare Authority with a
          secure, webform-based data capture and real-time insights.
        </p>
      </div>

      <main className="container">
        {/* Organization */}
        <section className="section">
          <h2 className="section__title">Organization Overview</h2>
          <Card>
            <p>
              XXX is a student consulting
              group formed for CSC 375 – Introduction to System Analysis. Our
              mission is to design innovative information systems that improve
              efficiency, accuracy, and collaboration for client organizations.
              Our team consists of six members with diverse skills in system analysis, 
              design, and implementation. Our approach is user-centered, ensuring that 
              our solutions meet the needs of end-users and stakeholders alike.
            </p>
          </Card>
        </section>

        {/* Client */}
        <section className="section">
          <h2 className="section__title">Client Organization</h2>
          <Card>
            <p>
              Our client is a regional healthcare authority responsible for patient 
              care and operational oversight across multiple departments. They 
              currently rely on Excel spreadsheets for data management, this includes 
              patient records, treatment plans, and operational metrics. This 
              approach has led to inefficiencies, data entry errors, 
              and challenges in ensuring consistency across departments.
            </p>
          </Card>
        </section>

        {/* Executive Summary */}
        <section className="section">
          <h2 className="section__title">Project Description</h2>
          <Card>
            <div>
              <p>
                Modernizing healthcare reporting systems from Excel files to webform-based systems. The client, a regional
                healthcare authority, currently relies on Excel-based spreadsheets for collecting and managing patient care
                and operational data. This approach results in inefficiencies, data entry errors, and challenges in ensuring
                consistency across multiple departments. Reports are time-consuming to compile and lack real-time visibility,
                delaying critical decision-making. The problem lies in the outdated reliance on static files, which are prone
                to version control issues and limited collaboration. To address these challenges, there is a need to modernize
                the reporting system by transitioning to a secure, webform-based solution that enables standardized data
                capture, streamlined workflows, and improved data accuracy.
              </p>

              <div style={{ marginTop: 16 }}>
                <h3>Executive Summary</h3>
                <p>
                  Our client is a regional healthcare management organization primarily responsible for patient care and
                  operational management across multiple departments. Currently, the organization still relies on Excel
                  spreadsheets to collect and manage critical medical data.
                </p>
              </div>

              <div style={{ marginTop: 16 }}>
                <h3>Problems</h3>
                <ul>
                  <li><strong>Inefficiency:</strong> Manual spreadsheet processes significantly slow down data reporting and decision-making.</li>
                  <li><strong>Data Errors:</strong> Inconsistent data entry due to lack of unified standards, coupled with difficult version control, leads to frequent inaccuracies.</li>
                  <li><strong>Limited Collaboration:</strong> Static files prevent real-time cross-departmental sharing and updates.</li>
                  <li><strong>Delayed Insights:</strong> Lengthy report generation causes critical decision delays.</li>
                </ul>
              </div>

              <div style={{ marginTop: 16 }}>
                <h3>Solution</h3>
                <p>
                  We recommend upgrading the existing Excel system to a secure, web-based form reporting platform.
                </p>
                <h4 style={{ marginTop: 8 }}>Core Advantages Include:</h4>
                <ul>
                  <li><strong>Standardized Data Collection:</strong> Ensures data consistency across departments.</li>
                  <li><strong>Process Optimization:</strong> Automated workflows reduce manual intervention.</li>
                  <li><strong>Enhanced Data Accuracy:</strong> Real-time validation minimizes errors.</li>
                  <li><strong>Strengthened Collaboration:</strong> Multiple users can access and update data simultaneously.</li>
                  <li><strong>Faster Data Insights:</strong> Real-time dashboards provide timely decision support for management.</li>
                </ul>
              </div>

            </div>
          </Card>
        </section>

        {/* Team */}
        <section className="section">
          <h2 className="section__title">Team Members & Roles</h2>
          <div className="card">
            <div className="team-grid">
              <TeamCard photo={p1} name="Nitin Ruhil" role="role" />
              <TeamCard photo={p2} name="Wenchu Kan" role="role" />
              <TeamCard photo={p3} name="Xiangyu Yang" role="role" />
              <TeamCard photo={p4} name="Yilun Shi" role="role" />
              <TeamCard photo={p5} name="Zhenhui Zhu" role="role" />
              <TeamCard photo={p6} name="Brian Pham" role="System Analyst" />
            </div>
          </div>
        </section>
        {/* Contact + Disclaimer */}
        <section className="section">
          <h2 className="section__title">Contact</h2>
          <Card>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:managedata375@outlook.com">
                managedata375@outlook.com
              </a>
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
}
