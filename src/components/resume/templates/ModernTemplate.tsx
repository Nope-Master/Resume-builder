import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customColors } = data;
  
  // Use custom colors if available, otherwise fall back to default colors
  const colors = customColors || ['#3B82F6', '#8B5CF6', '#06B6D4'];

  return (
    <div className="bg-white text-gray-900 max-w-4xl mx-auto shadow-lg font-sans" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <div className="text-white p-8" style={{ background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})` }}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.summary && (
              <p className="text-blue-100 text-lg leading-relaxed">
                {personalInfo.summary}
              </p>
            )}
          </div>
          <div className="space-y-2 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="truncate">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span className="truncate">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <span className="truncate">{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2" style={{ borderBottom: `2px solid ${colors[0]}` }}>
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="font-medium mb-2" style={{ color: colors[0] }}>
                    {exp.company} • {exp.location}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
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
               <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2" style={{ borderBottom: `2px solid ${colors[0]}` }}>
                 Education
               </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {edu.degree}
                    </h3>
                    <div className="font-medium" style={{ color: colors[0] }}>
                      {edu.institution}
                    </div>
                    <div className="text-sm text-gray-600">
                      {edu.field} • {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </div>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
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
               <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2" style={{ borderBottom: `2px solid ${colors[0]}` }}>
                 Skills
               </h2>
              {(() => {
                const groupedSkills = skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof skills>);

                return (
                  <div className="space-y-3">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                      <div key={category}>
                        <h3 className="font-semibold text-gray-800 mb-1">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded text-sm text-white"
                              style={{ backgroundColor: colors[0] }}
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
             <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2" style={{ borderBottom: `2px solid ${colors[0]}` }}>
               Projects
             </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.name}
                  </h3>
                  <div className="text-sm text-gray-600 mb-2">
                    {project.startDate} - {project.endDate}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
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
               <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2" style={{ borderBottom: `2px solid ${colors[0]}` }}>
                 Certifications
               </h2>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                    <div className="text-sm" style={{ color: colors[0] }}>{cert.issuer}</div>
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
               <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2" style={{ borderBottom: `2px solid ${colors[0]}` }}>
                 Languages
               </h2>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium text-gray-800">{lang.name}</span>
                    <span className="text-sm text-gray-600">{lang.proficiency}</span>
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