import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-gray-50 text-gray-900 max-w-4xl mx-auto shadow-2xl" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-5xl font-black mb-3 tracking-tight">
                {personalInfo.firstName}
              </h1>
              <h2 className="text-4xl font-light mb-4 text-pink-100">
                {personalInfo.lastName}
              </h2>
              {personalInfo.summary && (
                <p className="text-purple-100 text-lg leading-relaxed font-light">
                  {personalInfo.summary}
                </p>
              )}
            </div>
            <div className="space-y-3 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-3 bg-white bg-opacity-20 rounded-full px-4 py-2">
                  <Mail className="h-4 w-4" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-3 bg-white bg-opacity-20 rounded-full px-4 py-2">
                  <Phone className="h-4 w-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-3 bg-white bg-opacity-20 rounded-full px-4 py-2">
                  <MapPin className="h-4 w-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-3xl font-black text-purple-600 mb-6 relative">
              Experience
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-pink-600 font-bold text-lg mb-3">
                    {exp.company} • {exp.location}
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-3xl font-black text-purple-600 mb-6 relative">
                Education
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                    <h3 className="text-lg font-bold text-gray-800">
                      {edu.degree}
                    </h3>
                    <div className="text-purple-600 font-semibold">
                      {edu.institution}
                    </div>
                    <div className="text-sm text-gray-600">
                      {edu.field} • {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </div>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="mt-2 space-y-1 text-sm text-gray-700">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{achievement}</span>
                          </li>
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
              <h2 className="text-3xl font-black text-purple-600 mb-6 relative">
                Skills
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
              </h2>
              {(() => {
                const groupedSkills = skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof skills>);

                return (
                  <div className="space-y-4">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                      <div key={category} className="bg-white rounded-xl p-4 shadow-md">
                        <h3 className="font-bold text-gray-800 mb-3">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full font-medium"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </section>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-3xl font-black text-purple-600 mb-6 relative">
              Projects
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {project.name}
                  </h3>
                  <div className="text-sm text-purple-600 font-semibold mb-3">
                    {project.startDate} - {project.endDate}
                  </div>
                  <p className="text-gray-700 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-purple-600 mb-4 relative">
                Certifications
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                    <h3 className="font-bold text-gray-800">{cert.name}</h3>
                    <div className="text-purple-600 text-sm font-semibold">{cert.issuer}</div>
                    <div className="text-sm text-gray-600">
                      {cert.date}
                      {cert.expiryDate && ` - ${cert.expiryDate}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-purple-600 mb-4 relative">
                Languages
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
              </h2>
              <div className="bg-white rounded-lg p-4 shadow-md space-y-3">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">{lang.name}</span>
                    <span className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
                      {lang.proficiency}
                    </span>
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