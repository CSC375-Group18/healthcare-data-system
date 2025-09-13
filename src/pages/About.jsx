// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users } from 'lucide-react';
import '../ProjectWebsite.css';

import TeamCard from '../components/TeamCard';
import p1 from '../assets/team1.png';
import p2 from '../assets/team1.png';
import p3 from '../assets/team1.png';
import p4 from '../assets/team1.png';
import p5 from '../assets/team1.png';
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
              <strong>HealthData Solutions Inc.</strong> is a student consulting
              group formed for CSC 375 – Introduction to System Analysis. Our
              mission is to design innovative information systems that improve
              efficiency, accuracy, and collaboration for client organizations.
            </p>
          </Card>
        </section>

        {/* Client */}
        <section className="section">
          <h2 className="section__title">Client Organization</h2>
          <Card>
            <p>
              Our client is a <strong>Regional Healthcare Authority</strong>{' '}
              responsible for patient care and operational oversight across
              multiple departments. They currently rely on Excel spreadsheets
              for data management, which causes inefficiency and versioning
              issues.
            </p>
          </Card>
        </section>

        {/* Executive Summary */}
        <section className="section">
          <h2 className="section__title">Project Description</h2>
          <Card>
            <p>
              The spreadsheet-based workflow results in slow reporting,
              inconsistent data standards, and frequent errors. We propose a
              secure, web-based form reporting platform with standardized data
              models, real-time validation, multi-user collaboration, and
              dashboards for timely insights.
            </p>
          </Card>
        </section>

        {/* Team */}
        <section className="section">
          <h2 className="section__title">Team Members & Roles</h2>
          <div className="card">
            <div className="team-grid">
              <TeamCard
                photo={p1}
                name="name"
                role="role"
              />
              <TeamCard photo={p2} name="Member 2" role="role" />
              <TeamCard photo={p3} name="Member 3" role="role" />
              <TeamCard photo={p4} name="Member 4" role="role" />
              <TeamCard
                photo={p5}
                name="Member 5"
                role="roles"
              />
              <TeamCard photo={p6} name="Member 6" role="role" />
            </div>
          </div>
        </section>
        {/* Contact + Disclaimer */}
        <section className="section">
          <h2 className="section__title">Contact & Disclaimer</h2>
          <Card>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:csc375healthdata@uvic.ca">
                csc375healthdata@uvic.ca
              </a>
            </p>
            <p className="muted">
              <strong>Disclaimer:</strong> This website is created solely for
              the CSC 375 course project. It is intended for educational
              purposes only and does not represent a real consulting company.
            </p>
          </Card>
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} HealthData Solutions Inc. — Student Project
      </footer>
    </div>
  );
}
