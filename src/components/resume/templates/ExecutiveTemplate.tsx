import React from 'react';
import { ResumeData } from '@/types/resume';

interface ExecutiveTemplateProps {
  data: ResumeData;
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white text-gray-900 p-8 shadow-lg" style={{ minHeight: '11in', width: '8.5in' }}>
      {/* Header */}
      <div className="border-b-4 border-blue-800 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="text-lg text-gray-600 space-y-1">
          <div>{data.personalInfo.email} | {data.personalInfo.phone}</div>
          <div>{data.personalInfo.location}</div>
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          {data.personalInfo.summary && (
            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-3 border-b border-blue-200 pb-1">EXECUTIVE SUMMARY</h2>
              <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b border-blue-200 pb-1">PROFESSIONAL EXPERIENCE</h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-lg font-semibold text-blue-700">{exp.company}</p>
                      </div>
                      <div className="text-right text-gray-600">
                        <p className="font-medium">{exp.startDate} - {exp.endDate}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-blue-200 pb-1">EDUCATION</h2>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-blue-700 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-blue-200 pb-1">CORE COMPETENCIES</h2>
              <div className="space-y-1">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-gray-700 font-medium">• {skill.name}</div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-blue-200 pb-1">KEY PROJECTS</h2>
              <div className="space-y-3">
                {data.projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{project.technologies}</p>
                    <p className="text-sm text-gray-700">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-blue-200 pb-1">CERTIFICATIONS</h2>
              <div className="space-y-2">
                {data.certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-blue-700">{cert.issuer}</p>
                    <p className="text-sm text-gray-600">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-blue-200 pb-1">LANGUAGES</h2>
              <div className="space-y-1">
                {data.languages.map((lang, index) => (
                  <div key={index} className="text-gray-700">
                    <span className="font-medium">{lang.name}</span> - {lang.proficiency}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};