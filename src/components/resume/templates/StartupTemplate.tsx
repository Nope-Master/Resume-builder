import React from 'react';
import { ResumeData } from '@/types/resume';

interface StartupTemplateProps {
  data: ResumeData;
}

export const StartupTemplate: React.FC<StartupTemplateProps> = ({ data }) => {
  return (
    <div className="bg-gray-50 text-gray-900 p-8 min-h-[11in] w-[8.5in] mx-auto font-sans">
      {/* Geometric Header */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 -m-8 p-8 mb-8 text-white overflow-hidden">
        {/* Geometric shapes */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 transform rotate-45 -translate-x-16 translate-y-16"></div>
        <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white/20 rotate-45"></div>
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-white/15 rounded-full"></div>
        
        <div className="relative z-10 grid grid-cols-3 gap-8 items-center">
          <div className="col-span-2">
            <h1 className="text-4xl font-black mb-2 tracking-tight">
              {data.personalInfo.firstName} <span className="text-yellow-300">{data.personalInfo.lastName}</span>
            </h1>
            <div className="text-xl font-light mb-4 text-purple-100">Startup Innovator & Disruptor</div>
            {data.personalInfo.summary && (
              <p className="text-sm text-purple-100 leading-relaxed max-w-lg">
                {data.personalInfo.summary}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xs">📧</span>
                </div>
                {data.personalInfo.email}
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xs">📱</span>
                </div>
                {data.personalInfo.phone}
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xs">📍</span>
                </div>
                {data.personalInfo.location}
              </div>
              {data.personalInfo.website && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs">🌐</span>
                  </div>
                  {data.personalInfo.website}
                </div>
              )}
            </div>
          </div>
          
          {data.personalInfo.photo && (
            <div className="flex justify-end">
              <img 
                src={data.personalInfo.photo} 
                alt="Profile" 
                className="w-32 h-32 rounded-2xl border-4 border-white/30 object-cover shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Innovation Metrics */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
            <h2 className="text-lg font-black text-purple-700 mb-4 flex items-center">
              🚀 Innovation Metrics
            </h2>
            <div className="space-y-4">
              <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                <div className="text-2xl font-black text-purple-700">5+</div>
                <div className="text-xs text-purple-600 font-medium">Startups Launched</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                <div className="text-2xl font-black text-orange-600">$10M+</div>
                <div className="text-xs text-orange-600 font-medium">Funding Raised</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <div className="text-2xl font-black text-green-600">200%</div>
                <div className="text-xs text-green-600 font-medium">Growth Rate</div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          {data.skills.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
              <h2 className="text-lg font-black text-purple-700 mb-4 flex items-center">
                ⚡ Tech Arsenal
              </h2>
              <div className="space-y-3">
                {data.skills.slice(0, 8).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-6 rounded-full ${
                            level <= (skill.level === 'Expert' ? 4 : skill.level === 'Advanced' ? 3 : skill.level === 'Intermediate' ? 2 : 1)
                              ? 'bg-gradient-to-t from-purple-600 to-purple-400' 
                              : 'bg-gray-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Network */}
          {data.languages.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
              <h2 className="text-lg font-black text-purple-700 mb-4 flex items-center">
                🌍 Global Reach
              </h2>
              <div className="space-y-2">
                {data.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">{language.name}</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                      {language.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 space-y-8">
          {/* Experience as Ventures */}
          {data.experience.length > 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
              <h2 className="text-2xl font-black text-purple-700 mb-6 flex items-center">
                🏢 Venture Portfolio
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-black text-gray-900">{exp.position}</h3>
                            <div className="text-purple-600 font-bold text-lg">{exp.company}</div>
                            <div className="text-sm text-gray-600">{exp.location}</div>
                          </div>
                          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 rounded-full text-sm font-medium text-purple-700">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {exp.description.map((desc, descIndex) => (
                            <div key={descIndex} className="flex items-start text-sm text-gray-700">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span>{desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Innovation Projects */}
          {data.projects.length > 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
              <h2 className="text-2xl font-black text-purple-700 mb-6 flex items-center">
                💡 Innovation Lab
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {data.projects.slice(0, 3).map((project, index) => (
                  <div key={index} className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 p-6 border border-purple-200">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200/50 to-indigo-300/50 rounded-full translate-x-10 -translate-y-10"></div>
                    <div className="relative">
                      <h3 className="text-lg font-black text-gray-900 mb-2">{project.name}</h3>
                      <p className="text-sm text-gray-700 mb-4">{project.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span key={techIndex} className="px-3 py-1 bg-white text-purple-700 text-xs rounded-full font-medium border border-purple-200">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-purple-600 font-medium">
                          {project.startDate} - {project.endDate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 gap-6">
            {data.education.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
                <h2 className="text-xl font-black text-purple-700 mb-4 flex items-center">
                  🎓 Academic Foundation
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-start p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl">
                      <div>
                        <h3 className="font-black text-gray-900">{edu.degree}</h3>
                        <div className="text-purple-600 font-bold">{edu.field}</div>
                        <div className="text-gray-700 font-medium">{edu.institution}</div>
                        {edu.gpa && (
                          <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
                        )}
                      </div>
                      <div className="text-sm text-purple-600 font-medium">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.certifications.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
                <h2 className="text-xl font-black text-purple-700 mb-4 flex items-center">
                  🏆 Achievements & Certifications
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {data.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">
                        🏅
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-sm">{cert.name}</div>
                        <div className="text-orange-600 text-xs font-medium">{cert.issuer} • {cert.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};