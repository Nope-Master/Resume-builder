import React from 'react';
import { ResumeData } from '@/types/resume';

interface ConsultantTemplateProps {
  data: ResumeData;
}

export const ConsultantTemplate: React.FC<ConsultantTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white text-gray-900 p-8 min-h-[11in] w-[8.5in] mx-auto font-sans">
      <div className="grid grid-cols-3 gap-8 h-full">
        {/* Left Sidebar */}
        <div className="col-span-1 bg-gradient-to-b from-teal-600 to-teal-700 p-6 text-white -m-8 mr-4">
          <div className="mt-8">
            {/* Profile Photo - Only show if photo exists */}
            {data.personalInfo.photo && (
              <div className="mb-6">
                <img 
                  src={data.personalInfo.photo} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-white/20 mx-auto object-cover"
                />
              </div>
            )}
            
            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Contact</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="w-4 h-4 mt-0.5 mr-3">📧</span>
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-4 h-4 mt-0.5 mr-3">📱</span>
                  <span>{data.personalInfo.phone}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-4 h-4 mt-0.5 mr-3">📍</span>
                  <span>{data.personalInfo.location}</span>
                </div>
                {data.personalInfo.website && (
                  <div className="flex items-start">
                    <span className="w-4 h-4 mt-0.5 mr-3">🌐</span>
                    <span className="break-all">{data.personalInfo.website}</span>
                  </div>
                )}
                {data.personalInfo.linkedin && (
                  <div className="flex items-start">
                    <span className="w-4 h-4 mt-0.5 mr-3">💼</span>
                    <span className="break-all">{data.personalInfo.linkedin}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {data.skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Core Competencies</h2>
                <div className="space-y-3">
                  {data.skills.slice(0, 8).map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-xs opacity-80">{skill.level}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1.5">
                        <div 
                          className="bg-white rounded-full h-1.5 transition-all duration-300"
                          style={{ 
                            width: skill.level === 'Expert' ? '95%' : 
                                   skill.level === 'Advanced' ? '80%' : 
                                   skill.level === 'Intermediate' ? '65%' : '40%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Languages</h2>
                <div className="space-y-2">
                  {data.languages.map((language, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{language.name}</span>
                      <span className="text-xs opacity-80">{language.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Certifications</h2>
                <div className="space-y-3">
                  {data.certifications.slice(0, 4).map((cert, index) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-xs opacity-80">{cert.issuer} • {cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-2 space-y-8">
          {/* Header */}
          <div className="border-b-3 border-teal-600 pb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>
            <div className="text-xl text-teal-600 font-semibold mb-4">Business Consultant</div>
            {data.personalInfo.summary && (
              <p className="text-gray-700 leading-relaxed text-sm">
                {data.personalInfo.summary}
              </p>
            )}
          </div>

          {/* Professional Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b-2 border-teal-600 pb-2">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-teal-200">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-teal-600 rounded-full"></div>
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <div className="text-teal-600 font-semibold">{exp.company}</div>
                      <div className="text-sm text-gray-600">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate} • {exp.location}
                      </div>
                    </div>
                    <ul className="list-none space-y-2 text-sm text-gray-700">
                      {exp.description.map((desc, descIndex) => (
                        <li key={descIndex} className="flex items-start">
                          <span className="text-teal-600 mr-2">▸</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b-2 border-teal-600 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <div className="text-teal-600 font-semibold">{edu.institution}</div>
                      {edu.gpa && (
                        <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b-2 border-teal-600 pb-2">
                Key Projects
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {data.projects.slice(0, 3).map((project, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-teal-600">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
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