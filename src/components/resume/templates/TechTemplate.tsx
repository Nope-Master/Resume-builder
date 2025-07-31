import React from 'react';
import { ResumeData } from '@/types/resume';

interface TechTemplateProps {
  data: ResumeData;
}

export const TechTemplate: React.FC<TechTemplateProps> = ({ data }) => {
  return (
    <div className="bg-gray-900 text-white p-8 shadow-lg" style={{ minHeight: '11in', width: '8.5in' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 -m-8 mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="text-green-100 space-y-1">
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
              <h2 className="text-2xl font-bold text-green-400 mb-3 border-b border-green-500 pb-1">// ABOUT</h2>
              <p className="text-gray-300 leading-relaxed">{data.personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-green-400 mb-4 border-b border-green-500 pb-1">// EXPERIENCE</h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                        <p className="text-lg font-semibold text-blue-400">{exp.company}</p>
                      </div>
                      <div className="text-right text-gray-400">
                        <p className="font-mono">{exp.startDate} - {exp.endDate}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>
                    <ul className="space-y-1 text-gray-300">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-400 mr-2">{'>'}</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-green-400 mb-3 border-b border-green-500 pb-1">// TECH STACK</h2>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="bg-gray-800 px-3 py-1 rounded text-sm font-mono text-green-300">
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-green-400 mb-3 border-b border-green-500 pb-1">// PROJECTS</h2>
              <div className="space-y-3">
                {data.projects.map((project, index) => (
                  <div key={index} className="bg-gray-800 p-3 rounded">
                    <h3 className="font-bold text-blue-400 mb-1">{project.name}</h3>
                    <p className="text-xs text-green-300 mb-2 font-mono">{project.technologies}</p>
                    <p className="text-sm text-gray-300">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-green-400 mb-3 border-b border-green-500 pb-1">// EDUCATION</h2>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-white">{edu.degree}</h3>
                    <p className="text-blue-400 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-400 font-mono">{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-green-400 mb-3 border-b border-green-500 pb-1">// CERTIFICATIONS</h2>
              <div className="space-y-2">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-800 p-2 rounded">
                    <h3 className="font-bold text-white text-sm">{cert.name}</h3>
                    <p className="text-xs text-blue-400">{cert.issuer}</p>
                    <p className="text-xs text-gray-400 font-mono">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-green-400 mb-3 border-b border-green-500 pb-1">// LANGUAGES</h2>
              <div className="space-y-1">
                {data.languages.map((lang, index) => (
                  <div key={index} className="text-gray-300 font-mono text-sm">
                    <span className="text-blue-400">{lang.name}</span>: {lang.proficiency}
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