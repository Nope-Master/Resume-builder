import React from 'react';
import { ResumeData } from '@/types/resume';

interface GraphicTemplateProps {
  data: ResumeData;
}

export const GraphicTemplate: React.FC<GraphicTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white text-gray-900 p-8 shadow-lg" style={{ minHeight: '11in', width: '8.5in' }}>
      {/* Header */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 p-8 -m-8 mb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-2">
            {data.personalInfo.firstName}
          </h1>
          <h1 className="text-5xl font-light text-pink-100 mb-4">
            {data.personalInfo.lastName}
          </h1>
          <div className="text-purple-100 space-y-1 text-lg">
            <div>{data.personalInfo.email} | {data.personalInfo.phone}</div>
            <div>{data.personalInfo.location}</div>
            {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3 space-y-6">
          {/* Summary */}
          {data.personalInfo.summary && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-purple-600">PROFILE</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-11">{data.personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-purple-600">EXPERIENCE</h2>
              </div>
              <div className="space-y-4 pl-11">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-11 top-2 w-2 h-2 bg-pink-400 rounded-full"></div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-lg font-semibold text-purple-600">{exp.company}</p>
                      </div>
                      <div className="text-right text-gray-600">
                        <p className="font-medium bg-gray-100 px-3 py-1 rounded">{exp.startDate} - {exp.endDate}</p>
                        <p className="mt-1">{exp.location}</p>
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

        <div className="col-span-2 space-y-6">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mr-2"></div>
                <h2 className="text-xl font-bold text-purple-600">SKILLS</h2>
              </div>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg">
                    <div className="font-medium text-purple-800">{skill.name}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mr-2"></div>
                <h2 className="text-xl font-bold text-purple-600">EDUCATION</h2>
              </div>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-purple-600 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mr-2"></div>
                <h2 className="text-xl font-bold text-purple-600">PROJECTS</h2>
              </div>
              <div className="space-y-3">
                {data.projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-pink-400 pl-3">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-purple-600 mb-1">{project.technologies}</p>
                    <p className="text-sm text-gray-700">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mr-2"></div>
                <h2 className="text-xl font-bold text-purple-600">CERTIFICATIONS</h2>
              </div>
              <div className="space-y-2">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="bg-purple-50 p-2 rounded">
                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-purple-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-600">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mr-2"></div>
                <h2 className="text-xl font-bold text-purple-600">LANGUAGES</h2>
              </div>
              <div className="space-y-1">
                {data.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center text-gray-700">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-sm bg-pink-100 px-2 py-1 rounded">{lang.proficiency}</span>
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