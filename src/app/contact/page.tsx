import { Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 w-full">
      <div className="max-w-7xl mx-auto px-4 bg-white shadow-lg p-8 border-t-4 border-red-600">
        <h1 className="text-2xl font-bold text-red-600 text-center mb-10 tracking-widest uppercase">Contact Details</h1>
        
        {/* Table 1 */}
        <div className="mb-8">
          <div className="bg-[#1e4d8c] text-white p-2 font-bold text-sm">Director General of Meteorology - Details</div>
          <table className="w-full text-sm text-left border-collapse border border-gray-300">
            <thead className="bg-blue-100/50 font-bold text-gray-700">
              <tr>
                <th className="border border-gray-300 p-2 w-1/3">DGM</th>
                <th className="border border-gray-300 p-2 w-1/3">Tel NO.</th>
                <th className="border border-gray-300 p-2 w-1/3">EMAIL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 uppercase">DR. MRUTYUNJAY MOHAPATRA, DGM IMD</td>
                <td className="border border-gray-300 p-2">011-24611792/1842</td>
                <td className="border border-gray-300 p-2 text-blue-600">m.mohapatra@imd.gov.in</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 2 */}
        <div className="mb-8">
          <div className="bg-[#1e4d8c] text-white p-2 font-bold text-sm">For Weather Related (National) Queries</div>
          <table className="w-full text-sm text-left border-collapse border border-gray-300">
            <thead className="bg-blue-100/50 font-bold text-gray-700">
              <tr>
                <th className="border border-gray-300 p-2">IN-CHARGE</th>
                <th className="border border-gray-300 p-2">IN-CHARGE NO.</th>
                <th className="border border-gray-300 p-2">IN-CHARGE EMAIL</th>
                <th className="border border-gray-300 p-2">DUTY OFFICER NO.</th>
                <th className="border border-gray-300 p-2">DUTY OFFICER EMAIL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 uppercase">DR. NARESH KUMAR, SC-F</td>
                <td className="border border-gray-300 p-2">9968680077</td>
                <td className="border border-gray-300 p-2 text-blue-600">naresh.nhac@gmail.com</td>
                <td className="border border-gray-300 p-2">011-24344599</td>
                <td className="border border-gray-300 p-2 text-blue-600">wxchannel@gmail.com</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 uppercase">DR. AKHIL SRIVASTAVA, SC-D</td>
                <td className="border border-gray-300 p-2">8285281968</td>
                <td className="border border-gray-300 p-2 text-blue-600">akhil.srivastava@imd.gov.in</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 3 */}
        <div className="mb-8">
          <div className="bg-[#1e4d8c] text-white p-2 font-bold text-sm">For Cyclone Related Queries</div>
          <table className="w-full text-sm text-left border-collapse border border-gray-300">
            <thead className="bg-blue-100/50 font-bold text-gray-700">
              <tr>
                <th className="border border-gray-300 p-2">IN-CHARGE</th>
                <th className="border border-gray-300 p-2">IN-CHARGE NO.</th>
                <th className="border border-gray-300 p-2">IN-CHARGE EMAIL</th>
                <th className="border border-gray-300 p-2">DUTY OFFICER NO.</th>
                <th className="border border-gray-300 p-2">DUTY OFFICER EMAIL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 uppercase">DR. ANANDA KUMAR DAS, SC-F</td>
                <td className="border border-gray-300 p-2">9868126275</td>
                <td className="border border-gray-300 p-2 text-blue-600">ananda.das@imd.gov.in</td>
                <td className="border border-gray-300 p-2">011-24344377/4599</td>
                <td className="border border-gray-300 p-2 text-blue-600">cyclonewarningdivision@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
