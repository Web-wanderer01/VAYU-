import { Accessibility, Eye, Text, Ear, FileText } from 'lucide-react';

export default function ScreenReader() {
  return (
    <div className="bg-slate-50 min-h-screen pb-12 w-full">
      <div className="bg-[#0f1c3d] text-white pt-10 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <h1 className="text-4xl font-black mb-3 flex items-center justify-center md:justify-start">
            <Accessibility className="mr-3 text-blue-400" size={36}/> Accessibility Statement
          </h1>
          <p className="text-gray-300 text-lg font-medium">
            GIGW Compliance & Universal Access for VAYU - National Weather Forecasting Centre
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 space-y-6">
        
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <p className="text-gray-700 leading-relaxed mb-6">
            The <strong>VAYU Portal</strong> is fully committed to ensuring that its website is accessible to all users irrespective of device in use, technology, or ability. It has been built with an aim to provide maximum accessibility and usability to its visitors, meeting the guidelines of the <strong>Guidelines for Indian Government Websites (GIGW)</strong> and the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
              <Eye className="text-blue-600 mb-3" size={32}/>
              <h3 className="font-bold text-gray-900 mb-2">High Contrast Mode</h3>
              <p className="text-sm text-gray-600">
                A High Contrast toggle is available in the top bar. This strictly inverted color scheme drastically improves readability for visually impaired citizens, ensuring alerts are clearly distinguishable during low-visibility emergencies.
              </p>
            </div>

            <div className="p-6 bg-purple-50 border border-purple-100 rounded-xl">
              <Text className="text-purple-600 mb-3" size={32}/>
              <h3 className="font-bold text-gray-900 mb-2">Dynamic Text Sizing</h3>
              <p className="text-sm text-gray-600">
                Users can increase or decrease the global font size using the (A-, A, A+) controls in the header. The layout is fully responsive and will not break or obscure critical warning information when scaled up to 200%.
              </p>
            </div>

            <div className="p-6 bg-orange-50 border border-orange-100 rounded-xl">
              <Ear className="text-orange-600 mb-3" size={32}/>
              <h3 className="font-bold text-gray-900 mb-2">Screen Reader Compatibility</h3>
              <p className="text-sm text-gray-600">
                The portal extensively utilizes ARIA (Accessible Rich Internet Applications) tags. Navigation menus, disaster alerts, and interactive maps have hidden semantic context that popular screen readers (NVDA, JAWS) can interpret perfectly.
              </p>
            </div>

            <div className="p-6 bg-green-50 border border-green-100 rounded-xl">
              <FileText className="text-green-600 mb-3" size={32}/>
              <h3 className="font-bold text-gray-900 mb-2">Multilingual Audio Routing</h3>
              <p className="text-sm text-gray-600">
                Through integration with the <strong>Bhashini API</strong>, illiterate or visually disabled citizens can listen to localized survival protocols and SMS alerts translated into regional languages via IVR.
              </p>
            </div>

          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">Assistive Technology Testing</h3>
            <p className="text-sm text-gray-600 mb-4">The portal has been tested against the following screen readers to ensure emergency warnings are never missed:</p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li><strong>NVDA</strong> (NonVisual Desktop Access) on Windows</li>
              <li><strong>JAWS</strong> (Job Access With Speech) on Windows</li>
              <li><strong>VoiceOver</strong> on Apple iOS and macOS</li>
              <li><strong>TalkBack</strong> on Android devices</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
