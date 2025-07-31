import React from 'react';
import { ResumeData } from '@/types/resume';

interface SalesTemplateProps {
  data: ResumeData;
}

export const SalesTemplate: React.FC<SalesTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white text-gray-900 p-8 min-h-[11in] w-[8.5in] mx-auto font-sans">
      {/* Dynamic Header */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-700 -m-8 p-8 mb-8 text-white">
        {/* Success indicators */}
        <div className="absolute top-4 right-8 flex space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold">120%</div>
            <div className="text-xs opacity-80">Quota Achievement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">$2.5M</div>
            <div className="text-xs opacity-80">Revenue Generated</div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {data.personalInfo.photo && (
            <div className="flex-shrink-0">
              <img 
                src={data.personalInfo.photo} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white/30 object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>
            <div className="text-xl font-light mb-4">Sales Champion & Revenue Driver</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>📧 {data.personalInfo.email}</div>
              <div>📱 {data.personalInfo.phone}</div>
              <div>📍 {data.personalInfo.location}</div>
              {data.personalInfo.linkedin && (
                <div>💼 {data.personalInfo.linkedin}</div>
              )}
            </div>
          </div>
        </div>
        
        {/* Performance bar */}
        <div className="mt-6 bg-white/20 rounded-full h-2 w-full">
          <div className="bg-yellow-300 h-2 rounded-full w-3/4"></div>
        </div>
        <div className="text-xs mt-1 opacity-80">YTD Performance: 75% of Annual Target</div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Performance Metrics */}
        <div className="space-y-6">
          {/* Value Proposition */}
          {data.personalInfo.summary && (
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h2 className="text-lg font-bold text-red-700 mb-3">Value Proposition</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {data.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Sales Achievements */}
          <div className="bg-white border-2 border-red-200 rounded-lg p-4">
            <h2 className="text-lg font-bold text-red-600 mb-4 uppercase tracking-wide">
              🎯 Sales Achievements
            </h2>
            <div className="space-y-4">
              <div className="text-center p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
                <div className="text-xl font-bold text-red-600">#1</div>
                <div className="text-xs text-red-500 font-medium">Top Performer 2023</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">150%</div>
                <div className="text-xs text-green-500 font-medium">Quota Attainment</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">95%</div>
                <div className="text-xs text-blue-500 font-medium">Customer Retention</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
                <div className="text-xl font-bold text-orange-600">45</div>
                <div className="text-xs text-orange-500 font-medium">Deals Closed/Month</div>
              </div>
            </div>
          </div>

          {/* Core Competencies */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-red-600 mb-4 uppercase tracking-wide">
                Core Sales Skills
              </h2>
              <div className="space-y-3">
                {data.skills.slice(0, 8).map((skill, index) => (
                  <div key={index} className="bg-white border border-red-100 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-xs text-red-600 font-bold">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-600 rounded-full h-2 transition-all duration-300"
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

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-red-600 mb-3 uppercase tracking-wide">
                Sales Certifications
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="text-sm bg-red-50 p-3 rounded-lg">
                    <div className="font-medium text-gray-900">{cert.name}</div>
                    <div className="text-red-600 text-xs">{cert.issuer} • {cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Experience & Results */}
        <div className="col-span-2 space-y-8">
          {/* Professional Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-6 uppercase tracking-wide flex items-center">
                <div className="w-8 h-1 bg-gradient-to-r from-red-500 to-pink-500 mr-4"></div>
                Sales Performance Track Record
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="bg-white border-2 border-red-100 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                        <div className="text-red-600 font-semibold text-lg">{exp.company}</div>
                        <div className="text-sm text-gray-600">{exp.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {exp.current ? 'Current Role' : 'Previous Role'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Key Results */}
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg mb-4">
                      <h4 className="font-bold text-red-700 text-sm mb-2">🏆 KEY RESULTS</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-green-600">↗ 35%</div>
                          <div className="text-xs text-gray-600">Sales Growth</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-600">$500K</div>
                          <div className="text-xs text-gray-600">Avg Deal Size</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-purple-600">98%</div>
                          <div className="text-xs text-gray-600">Customer Satisfaction</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {exp.description.map((desc, descIndex) => (
                        <div key={descIndex} className="flex items-start text-sm text-gray-700">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>{desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Major Deals/Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-6 uppercase tracking-wide flex items-center">
                <div className="w-8 h-1 bg-gradient-to-r from-red-500 to-pink-500 mr-4"></div>
                Major Deals & Campaigns
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {data.projects.slice(0, 3).map((project, index) => (
                  <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        CLOSED WON
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 bg-white text-red-700 text-xs rounded-full font-medium border border-red-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        {project.startDate} - {project.endDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-6 uppercase tracking-wide flex items-center">
                <div className="w-8 h-1 bg-gradient-to-r from-red-500 to-pink-500 mr-4"></div>
                Education & Training
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                        <div className="text-red-600 font-semibold">{edu.field}</div>
                        <div className="text-gray-700">{edu.institution}</div>
                        {edu.gpa && (
                          <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
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
        </div>
      </div>

      {/* Footer with Languages */}
      {data.languages.length > 0 && (
        <div className="mt-8 pt-6 border-t-2 border-red-200 bg-red-50 -mx-8 px-8 pb-4 rounded-t-lg">
          <div className="flex items-center justify-center space-x-8">
            <h3 className="text-lg font-bold text-red-600">GLOBAL SALES REACH:</h3>
            {data.languages.map((language, index) => (
              <div key={index} className="text-center">
                <div className="font-medium text-gray-900">{language.name}</div>
                <div className="text-sm text-red-600">{language.proficiency}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};