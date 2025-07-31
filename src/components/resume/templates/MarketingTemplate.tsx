import React from 'react';
import { ResumeData } from '@/types/resume';

interface MarketingTemplateProps {
  data: ResumeData;
}

export const MarketingTemplate: React.FC<MarketingTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white text-gray-900 p-8 min-h-[11in] w-[8.5in] mx-auto font-sans">
      {/* Header with Photo */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 -m-8 p-8 mb-8 text-white">
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
            <div className="text-xl font-light mb-4">Marketing Professional</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>📧 {data.personalInfo.email}</div>
              <div>📱 {data.personalInfo.phone}</div>
              <div>📍 {data.personalInfo.location}</div>
              {data.personalInfo.website && (
                <div>🌐 {data.personalInfo.website}</div>
              )}
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white/10 rounded-full translate-y-10"></div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Brand Statement */}
          {data.personalInfo.summary && (
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <h2 className="text-lg font-bold text-orange-700 mb-3">Brand Statement</h2>
              <p className="text-sm text-gray-700 leading-relaxed italic">
                {data.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Core Competencies */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-orange-600 mb-4 uppercase tracking-wide">
                Core Competencies
              </h2>
              <div className="space-y-3">
                {data.skills.slice(0, 8).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`w-3 h-3 rounded-full ${
                            star <= (skill.level === 'Expert' ? 5 : skill.level === 'Advanced' ? 4 : skill.level === 'Intermediate' ? 3 : 2)
                              ? 'bg-orange-500' 
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

          {/* Achievements */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-red-600 mb-3 uppercase tracking-wide">
              Key Achievements
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                  +35%
                </div>
                <span className="text-sm text-gray-700">Increased brand awareness</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                  $2M
                </div>
                <span className="text-sm text-gray-700">Revenue generated from campaigns</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                  50K
                </div>
                <span className="text-sm text-gray-700">Social media followers gained</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-orange-600 mb-3 uppercase tracking-wide">
                Certifications
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium text-gray-900">{cert.name}</div>
                    <div className="text-orange-600 text-xs">{cert.issuer} • {cert.date}</div>
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
              <h2 className="text-2xl font-bold text-orange-600 mb-6 uppercase tracking-wide flex items-center">
                <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 mr-4"></div>
                Professional Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-orange-500">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                          <div className="text-orange-600 font-semibold text-lg">{exp.company}</div>
                          <div className="text-sm text-gray-600">{exp.location}</div>
                        </div>
                        <div className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 shadow-sm">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {exp.description.map((desc, descIndex) => (
                          <div key={descIndex} className="flex items-start text-sm text-gray-700">
                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>{desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Campaign Portfolio */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-6 uppercase tracking-wide flex items-center">
                <div className="w-8 h-1 bg-gradient-to-r from-red-500 to-orange-500 mr-4"></div>
                Campaign Portfolio
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {data.projects.slice(0, 3).map((project, index) => (
                  <div key={index} className="bg-white border-2 border-orange-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-xs rounded-full font-medium">
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
              <h2 className="text-2xl font-bold text-orange-600 mb-6 uppercase tracking-wide flex items-center">
                <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 mr-4"></div>
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                        <div className="text-orange-600 font-semibold">{edu.field}</div>
                        <div className="text-gray-700">{edu.institution}</div>
                        {edu.gpa && (
                          <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
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
        <div className="mt-8 pt-6 border-t-2 border-orange-200">
          <div className="flex items-center justify-center space-x-8">
            <h3 className="text-lg font-bold text-orange-600">LANGUAGES:</h3>
            {data.languages.map((language, index) => (
              <div key={index} className="text-center">
                <div className="font-medium text-gray-900">{language.name}</div>
                <div className="text-sm text-orange-600">{language.proficiency}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};