import React from 'react';
import { ResumeData } from '@/types/resume';

interface FinanceTemplateProps {
  data: ResumeData;
}

export const FinanceTemplate: React.FC<FinanceTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white text-gray-900 p-8 min-h-[11in] w-[8.5in] mx-auto font-serif">
      {/* Conservative Header */}
      <div className="border-b-4 border-gray-800 pb-6 mb-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-wide">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>
            <div className="text-lg text-gray-700 font-medium mb-4 uppercase tracking-widest">
              Finance Professional
            </div>
            {data.personalInfo.summary && (
              <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
                {data.personalInfo.summary}
              </p>
            )}
          </div>
          
          {data.personalInfo.photo && (
            <div className="ml-8">
              <img 
                src={data.personalInfo.photo} 
                alt="Profile" 
                className="w-24 h-24 rounded object-cover border-2 border-gray-300"
              />
            </div>
          )}
        </div>
        
        <div className="mt-6 grid grid-cols-4 gap-6 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="w-4 h-4 mr-2 text-gray-800">📧</span>
            {data.personalInfo.email}
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 mr-2 text-gray-800">📞</span>
            {data.personalInfo.phone}
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 mr-2 text-gray-800">📍</span>
            {data.personalInfo.location}
          </div>
          {data.personalInfo.linkedin && (
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2 text-gray-800">💼</span>
              LinkedIn Profile
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Core Competencies */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Core Competencies
              </h2>
              <div className="space-y-3">
                {Object.entries(
                  data.skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill);
                    return acc;
                  }, {} as Record<string, any[]>)
                ).map(([category, skills], index) => (
                  <div key={index}>
                    <div className="font-semibold text-gray-800 text-sm mb-2 uppercase tracking-wide">
                      {category}
                    </div>
                    <div className="space-y-1">
                      {skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{skill.name}</span>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-2 h-2 ${
                                  level <= (skill.level === 'Expert' ? 5 : skill.level === 'Advanced' ? 4 : skill.level === 'Intermediate' ? 3 : 2)
                                    ? 'bg-gray-800' 
                                    : 'bg-gray-300'
                                } rounded-full`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Professional Certifications
              </h2>
              <div className="space-y-3">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="border-l-4 border-gray-400 pl-3">
                    <div className="font-semibold text-gray-900 text-sm">{cert.name}</div>
                    <div className="text-gray-700 text-xs">{cert.issuer}</div>
                    <div className="text-gray-600 text-xs">{cert.date}</div>
                    {cert.credentialId && (
                      <div className="text-gray-500 text-xs">ID: {cert.credentialId}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Achievements */}
          <div className="bg-gray-50 p-4 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">
              Key Financial Metrics
            </h2>
            <div className="space-y-3">
              <div className="text-center p-3 bg-white border border-gray-300">
                <div className="text-lg font-bold text-gray-800">$50M+</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Portfolio Managed</div>
              </div>
              <div className="text-center p-3 bg-white border border-gray-300">
                <div className="text-lg font-bold text-gray-800">15%</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">ROI Improvement</div>
              </div>
              <div className="text-center p-3 bg-white border border-gray-300">
                <div className="text-lg font-bold text-gray-800">99.8%</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Accuracy Rate</div>
              </div>
            </div>
          </div>

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Languages
              </h2>
              <div className="space-y-2">
                {data.languages.map((language, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-700 font-medium">{language.name}</span>
                    <span className="text-gray-600">{language.proficiency}</span>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-wide border-b-3 border-gray-800 pb-2">
                Professional Experience
              </h2>
              <div className="space-y-8">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gray-300"></div>
                    <div className="pl-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                          <div className="text-gray-700 font-semibold text-lg">{exp.company}</div>
                          <div className="text-sm text-gray-600">{exp.location}</div>
                        </div>
                        <div className="text-sm text-gray-600 font-medium text-right">
                          <div>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {exp.current ? 'Current Position' : 'Former Position'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Quantified Results */}
                      <div className="bg-gray-50 p-4 mb-4 border-l-4 border-gray-400">
                        <h4 className="font-bold text-gray-800 text-sm mb-2 uppercase tracking-wide">
                          Quantified Results
                        </h4>
                        <div className="grid grid-cols-3 gap-4 text-center text-sm">
                          <div>
                            <div className="font-bold text-gray-800">25%</div>
                            <div className="text-xs text-gray-600">Cost Reduction</div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">$2M</div>
                            <div className="text-xs text-gray-600">Savings Generated</div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">100%</div>
                            <div className="text-xs text-gray-600">Compliance Rate</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {exp.description.map((desc, descIndex) => (
                          <div key={descIndex} className="flex items-start text-sm text-gray-700">
                            <span className="text-gray-400 mr-3 mt-1">■</span>
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

          {/* Financial Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-wide border-b-3 border-gray-800 pb-2">
                Key Financial Projects
              </h2>
              <div className="space-y-6">
                {data.projects.slice(0, 3).map((project, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-gray-200 text-gray-800 text-xs font-medium border border-gray-300 uppercase tracking-wide">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-wide border-b-3 border-gray-800 pb-2">
                Education
              </h2>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-gray-400 pl-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                        <div className="text-gray-700 font-semibold">{edu.field}</div>
                        <div className="text-gray-700">{edu.institution}</div>
                        {edu.gpa && (
                          <div className="text-sm text-gray-600 mt-1">
                            Cumulative GPA: {edu.gpa}
                          </div>
                        )}
                        {edu.achievements && edu.achievements.length > 0 && (
                          <div className="mt-2">
                            <div className="text-sm font-semibold text-gray-800 mb-1">Academic Honors:</div>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {edu.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start">
                                  <span className="text-gray-400 mr-2">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 font-medium text-right">
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
    </div>
  );
};