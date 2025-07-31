import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-white text-gray-900 max-w-4xl mx-auto shadow-lg font-serif" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <div className="border-b-4 border-emerald-800 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-wide">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
          {personalInfo.summary && (
            <p className="text-gray-700 text-lg leading-relaxed mt-4 max-w-3xl mx-auto">
              {personalInfo.summary}
            </p>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center uppercase tracking-wider">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-gray-300 pl-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {exp.position}
                  </h3>
                  <div className="text-lg font-semibold text-gray-600 mb-1">
                    {exp.company} | {exp.location}
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
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

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center uppercase tracking-wider">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-gray-300 pl-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {edu.degree}
                  </h3>
                  <div className="text-lg font-semibold text-gray-600">
                    {edu.institution}
                  </div>
                  <div className="text-sm text-gray-500">
                    {edu.field} | {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center uppercase tracking-wider">
              Skills
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
                    <div key={category} className="border-l-4 border-gray-300 pl-6">
                      <h3 className="font-bold text-gray-800 mb-2 uppercase">{category}</h3>
                      <div className="text-gray-700">
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center uppercase tracking-wider">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="border-l-4 border-gray-300 pl-6">
                  <h3 className="text-lg font-bold text-gray-800">
                    {project.name}
                  </h3>
                  <div className="text-sm text-gray-500 mb-2">
                    {project.startDate} - {project.endDate}
                  </div>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  <div className="text-sm text-gray-600">
                    <strong>Technologies:</strong> {project.technologies.join(' • ')}
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
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider">
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-800">{cert.name}</h3>
                    <div className="text-gray-600 text-sm">{cert.issuer}</div>
                    <div className="text-sm text-gray-500">
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
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider">
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