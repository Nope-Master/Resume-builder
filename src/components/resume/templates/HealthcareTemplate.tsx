import React from 'react';
import { ResumeData } from '@/types/resume';

interface HealthcareTemplateProps {
  data: ResumeData;
}

export const HealthcareTemplate: React.FC<HealthcareTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white text-gray-900 p-8 min-h-[11in] w-[8.5in] mx-auto font-sans">
      {/* Header Section */}
      <div className="text-center border-b-4 border-blue-600 pb-6 mb-8">
        {data.personalInfo.photo && (
          <div className="mb-4">
            <img 
              src={data.personalInfo.photo} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-blue-100 mx-auto object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-light text-gray-900 mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="text-xl text-blue-600 font-normal mb-4">Healthcare Professional</div>
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <span>📧 {data.personalInfo.email}</span>
          <span>📱 {data.personalInfo.phone}</span>
          <span>📍 {data.personalInfo.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          {/* Professional Summary */}
          {data.personalInfo.summary && (
            <div>
              <h2 className="text-lg font-semibold text-blue-600 mb-3 uppercase tracking-wide border-b border-blue-200 pb-1">
                Professional Summary
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {data.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-blue-600 mb-3 uppercase tracking-wide border-b border-blue-200 pb-1">
                Clinical Skills
              </h2>
              <div className="space-y-2">
                {data.skills.slice(0, 10).map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-blue-600 mb-3 uppercase tracking-wide border-b border-blue-200 pb-1">
                Licenses & Certifications
              </h2>
              <div className="space-y-3">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded">
                    <div className="font-medium text-gray-900 text-sm">{cert.name}</div>
                    <div className="text-xs text-gray-600">{cert.issuer}</div>
                    <div className="text-xs text-blue-600">{cert.date}</div>
                    {cert.credentialId && (
                      <div className="text-xs text-gray-500">ID: {cert.credentialId}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-blue-600 mb-3 uppercase tracking-wide border-b border-blue-200 pb-1">
                Languages
              </h2>
              <div className="space-y-2">
                {data.languages.map((language, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-700">{language.name}</span>
                    <span className="text-blue-600 font-medium">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          {/* Professional Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-6 uppercase tracking-wide border-b-2 border-blue-600 pb-2">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="border-l-3 border-blue-200 pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                      <div className="text-blue-600 font-medium text-lg">{exp.company}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate} | {exp.location}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {exp.description.map((desc, descIndex) => (
                        <div key={descIndex} className="flex items-start text-sm text-gray-700">
                          <span className="text-blue-400 mr-2 mt-1">+</span>
                          <span>{desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-6 uppercase tracking-wide border-b-2 border-blue-600 pb-2">
                Education & Training
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                        <div className="text-blue-600 font-medium">{edu.field}</div>
                        <div className="text-gray-700 font-medium">{edu.institution}</div>
                        {edu.gpa && (
                          <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
                        )}
                        {edu.achievements && edu.achievements.length > 0 && (
                          <div className="mt-2">
                            <div className="text-sm font-medium text-gray-700 mb-1">Achievements:</div>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {edu.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start">
                                  <span className="text-blue-400 mr-2">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 text-right">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects/Research */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-6 uppercase tracking-wide border-b-2 border-blue-600 pb-2">
                Research & Projects
              </h2>
              <div className="space-y-4">
                {data.projects.slice(0, 3).map((project, index) => (
                  <div key={index} className="border border-blue-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                    <div className="text-xs text-gray-600 mb-2">
                      {project.startDate} - {project.endDate}
                    </div>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};