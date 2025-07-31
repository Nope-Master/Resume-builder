import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-white text-gray-900 max-w-4xl mx-auto" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <div className="p-8 border-b border-gray-200">
        <h1 className="text-5xl font-light mb-4 tracking-wide text-gray-800">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
          {personalInfo.email && (
            <span className="flex items-center gap-2">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-2">
              <Globe className="h-3 w-3" />
              {personalInfo.website}
            </span>
          )}
        </div>
        {personalInfo.summary && (
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            {personalInfo.summary}
          </p>
        )}
      </div>

      <div className="p-8 space-y-12">
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xl font-light text-gray-800 mb-8 pb-2 border-b border-gray-200">
              EXPERIENCE
            </h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {exp.position}
                      </h3>
                      <div className="text-gray-600">
                        {exp.company} • {exp.location}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 font-light">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1 text-gray-700 text-sm leading-relaxed">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="pl-4 relative">
                        <span className="absolute left-0 top-2 w-1 h-1 bg-gray-400 rounded-full"></span>
                        {item}
                      </li>
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
            <h2 className="text-xl font-light text-gray-800 mb-8 pb-2 border-b border-gray-200">
              EDUCATION
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-1">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {edu.degree}
                      </h3>
                      <div className="text-gray-600">
                        {edu.institution}
                      </div>
                      <div className="text-sm text-gray-500">
                        {edu.field}
                        {edu.gpa && ` • GPA: ${edu.gpa}`}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 font-light">
                      {edu.startDate} – {edu.endDate}
                    </div>
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="pl-4 relative">
                          <span className="absolute left-0 top-2 w-1 h-1 bg-gray-400 rounded-full"></span>
                          {achievement}
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
            <h2 className="text-xl font-light text-gray-800 mb-8 pb-2 border-b border-gray-200">
              SKILLS
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
                    <div key={category}>
                      <h3 className="font-medium text-gray-800 mb-2 uppercase text-sm tracking-wide">{category}</h3>
                      <div className="text-gray-700 text-sm">
                        {categorySkills.map((skill, idx) => skill.name).join(' • ')}
                      </div>
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
            <h2 className="text-xl font-light text-gray-800 mb-8 pb-2 border-b border-gray-200">
              PROJECTS
            </h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-800">
                      {project.name}
                    </h3>
                    <div className="text-sm text-gray-500 font-light">
                      {project.startDate} – {project.endDate}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">{project.description}</p>
                  <div className="text-xs text-gray-500">
                    {project.technologies.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">
                CERTIFICATIONS
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-gray-800 text-sm">{cert.name}</h3>
                    <div className="text-gray-600 text-sm">{cert.issuer}</div>
                    <div className="text-xs text-gray-500">
                      {cert.date}
                      {cert.expiryDate && ` – ${cert.expiryDate}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-xl font-light text-gray-800 mb-6 pb-2 border-b border-gray-200">
                LANGUAGES
              </h2>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="font-medium text-gray-800">{lang.name}</span>
                    <span className="text-gray-600">{lang.proficiency}</span>
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