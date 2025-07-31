import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const ATSTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-white text-black max-w-4xl mx-auto font-sans" style={{ minHeight: '297mm', lineHeight: '1.4' }}>
      {/* Header */}
      <div className="p-8 border-b border-black">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-center space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.website && <div>{personalInfo.website}</div>}
          {personalInfo.linkedin && <div>LinkedIn: {personalInfo.linkedin}</div>}
          {personalInfo.github && <div>GitHub: {personalInfo.github}</div>}
        </div>
        {personalInfo.summary && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">PROFESSIONAL SUMMARY</h2>
            <p>{personalInfo.summary}</p>
          </div>
        )}
      </div>

      <div className="p-8 space-y-8">
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="mb-2">
                    <h3 className="font-bold text-base">
                      {exp.position}
                    </h3>
                    <div className="font-medium">
                      {exp.company}, {exp.location}
                    </div>
                    <div>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <ul className="ml-4 space-y-1">
                    {exp.description.map((item, idx) => (
                      <li key={idx} style={{ listStyleType: 'disc' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-bold">
                    {edu.degree}
                  </h3>
                  <div>
                    {edu.institution}
                  </div>
                  <div>
                    {edu.field}, {edu.startDate} - {edu.endDate}
                    {edu.gpa && `, GPA: ${edu.gpa}`}
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="ml-4 mt-2">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} style={{ listStyleType: 'disc' }}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
              SKILLS
            </h2>
            {(() => {
              const groupedSkills = skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof skills>);

              return (
                <div className="space-y-2">
                  {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                    <div key={category}>
                      <strong>{category}:</strong> {categorySkills.map(skill => skill.name).join(', ')}
                    </div>
                  ))}
                </div>
              );
            })()}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-bold">
                    {project.name}
                  </h3>
                  <div>
                    {project.startDate} - {project.endDate}
                  </div>
                  <p className="mt-1">{project.description}</p>
                  <div className="mt-1">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
              CERTIFICATIONS
            </h2>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <strong>{cert.name}</strong> - {cert.issuer}, {cert.date}
                  {cert.expiryDate && ` (Expires: ${cert.expiryDate})`}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 border-b border-black pb-1">
              LANGUAGES
            </h2>
            <div>
              {languages.map((lang, index) => (
                <span key={index}>
                  {lang.name} ({lang.proficiency}){index < languages.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};