import React from 'react';
import { ResumeData } from '@/types/resume';

interface AcademicTemplateProps {
  data: ResumeData;
}

export const AcademicTemplate: React.FC<AcademicTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white text-gray-900 p-8 min-h-[11in] w-[8.5in] mx-auto font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-purple-700 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="text-lg text-purple-700 font-medium mb-4">Academic Researcher</div>
        <div className="flex justify-center space-x-4 text-sm text-gray-600">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
        </div>
        {data.personalInfo.website && (
          <div className="text-sm text-purple-600 mt-2">{data.personalInfo.website}</div>
        )}
      </div>

      {/* Research Interests / Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-3 uppercase tracking-wide">
            Research Interests
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed italic">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-purple-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    <div className="text-purple-700 font-medium">{edu.field}</div>
                    <div className="text-gray-700 italic">{edu.institution}</div>
                    {edu.gpa && (
                      <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
                    )}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="mt-2">
                        <div className="text-sm font-medium text-gray-700">Honors & Awards:</div>
                        <ul className="text-sm text-gray-600 ml-4">
                          {edu.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="list-disc">{achievement}</li>
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

      {/* Academic Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
            Academic Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <div className="text-purple-700 font-medium italic">{exp.company}</div>
                    <div className="text-sm text-gray-600">{exp.location}</div>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications & Research */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
            Publications & Research Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-2 border-purple-300 pl-4">
                <h3 className="font-bold text-gray-900 text-base">{project.name}</h3>
                <p className="text-sm text-gray-700 mb-2 italic">{project.description}</p>
                <div className="text-xs text-gray-600 mb-2">
                  {project.startDate} - {project.endDate}
                </div>
                {project.url && (
                  <div className="text-xs text-purple-600 underline">{project.url}</div>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-600">Keywords: </span>
                    <span className="text-xs text-gray-700 italic">
                      {project.technologies.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Skills & Expertise */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
              Technical Skills
            </h2>
            <div className="space-y-3">
              {Object.entries(
                data.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill.name);
                  return acc;
                }, {} as Record<string, string[]>)
              ).map(([category, skills], index) => (
                <div key={index}>
                  <div className="font-medium text-gray-800 text-sm mb-1">{category}:</div>
                  <div className="text-sm text-gray-700">{skills.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Honors */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
              Certifications & Honors
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert, index) => (
                <div key={index}>
                  <div className="font-medium text-gray-900 text-sm">{cert.name}</div>
                  <div className="text-xs text-purple-700">{cert.issuer}</div>
                  <div className="text-xs text-gray-600">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
            Languages
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {data.languages.map((language, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium text-gray-900">{language.name}</span>
                <span className="text-gray-600"> ({language.proficiency})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};