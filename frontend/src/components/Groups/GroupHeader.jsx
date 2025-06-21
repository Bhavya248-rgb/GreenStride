// import React, { useState } from 'react';

// const GreenConnect = () => {
//   // Mock Data for Groups
//   const mockGroups = [
//     { id: 1, name: "Eco Warriors", code: "ECO123", totalMembers: 50, co2Saved: 12000, waterSaved: 50000 },
//     { id: 2, name: "Green Champions", code: "GRN456", totalMembers: 30, co2Saved: 8000, waterSaved: 30000 },
//     { id: 3, name: "Zero Waste Heroes", code: "ZWH789", totalMembers: 20, co2Saved: 5000, waterSaved: 20000 },
//   ];

//   // Mock Data for Members
//   const mockMembers = [
//     { id: 1, name: "John Doe", progress: 75 },
//     { id: 2, name: "Jane Smith", progress: 50 },
//     { id: 3, name: "Alice Johnson", progress: 90 },
//     { id: 4, name: "Bob Brown", progress: 60 },
//     { id: 5, name: "Charlie Davis", progress: 80 },
//   ];

//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
//   const [groupName, setGroupName] = useState('');
//   const [groupCode, setGroupCode] = useState('');

//   // Handle Create Group
//   const handleCreateGroup = () => {
//     if (groupName.trim()) {
//       alert(`Created group: ${groupName}`);
//       setGroupName(''); // Reset input
//       setIsCreateModalOpen(false); // Close modal
//     }
//   };

//   // Handle Join Group
//   const handleJoinGroup = () => {
//     if (groupCode.trim()) {
//       alert(`Joined group with code: ${groupCode}`);
//       setGroupCode(''); // Reset input
//       setIsJoinModalOpen(false); // Close modal
//     }
//   };

//   // Handle Group Click
//   const handleGroupClick = (group) => {
//     setSelectedGroup(group);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Group Sidebar */}
//       <aside className="fixed top-8 left-8 h-[calc(100vh-7rem)] w-72 bg-white shadow-2xl rounded-3xl p-6 space-y-6 z-50 mt-15">
//         {/* Create Group Button */}
//         <button
//           onClick={() => setIsCreateModalOpen(true)}
//           className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300"
//         >
//           + Create Group
//         </button>

//         {/* Join Group Button */}
//         <button
//           onClick={() => setIsJoinModalOpen(true)}
//           className="w-full p-3 bg-gradient-to-r text-black font-bold rounded-lg transition duration-300"
//         >
//           + Join Group
//         </button>

//         {/* Groups List */}
//         <div className="space-y-4 overflow-y-auto max-h-[calc(100%-9rem)]">
//           {mockGroups.map((group) => (
//             <div
//               key={group.id}
//               onClick={() => handleGroupClick(group)}
//               className="block w-full p-4 bg-gray-50 text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition duration-300 cursor-pointer shadow-sm"
//             >
//               {group.name}
//             </div>
//           ))}
//         </div>

//         {/* Create Group Modal */}
//         {isCreateModalOpen && (
//           <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//               <h2 className="text-xl font-bold mb-4">Create a New Group</h2>
//               <input
//                 type="text"
//                 placeholder="Group Name"
//                 value={groupName}
//                 onChange={(e) => setGroupName(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded mb-4"
//               />
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={() => setIsCreateModalOpen(false)}
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleCreateGroup}
//                   className="px-4 py-2 bg-green-600 text-white rounded"
//                 >
//                   Create
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Join Group Modal */}
//         {isJoinModalOpen && (
//           <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//               <h2 className="text-xl font-bold mb-4">Join a Group</h2>
//               <input
//                 type="text"
//                 placeholder="Enter Group Code"
//                 value={groupCode}
//                 onChange={(e) => setGroupCode(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded mb-4"
//               />
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={() => setIsJoinModalOpen(false)}
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleJoinGroup}
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Join
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </aside>

//       {/* Main Content */}
//       <main className="ml-[22rem] p-8">
//         {/* Group Header Section */}
//         {selectedGroup ? (
//           <>
//             <GroupHeader group={selectedGroup} />
//             {/* Daily Challenge Section */}
//             <DailyChallenge />
//             {/* Group Members Section */}
//             <GroupMembers members={mockMembers} />
//             {/* Additional Content Below Group Header */}
//             <div className="mt-8">
//               <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
//               <p className="text-gray-500">No recent activity yet.</p>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-500">Select a group to view details.</p>
//         )}
//       </main>
//     </div>
//   );
// };

// // GroupHeader Component
// const GroupHeader = ({ group }) => {
//   return (
//     <section className="bg-white shadow-2xl rounded-3xl p-8 space-y-6 mx-4">
//       {/* Group Name */}
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-800">{group.name}</h1>
//         <p className="text-sm text-gray-500">Group Code: {group.code}</p>
//       </div>

//       {/* Group Stats */}
//       <div className="space-y-4">
//         {/* Total Members */}
//         <div className="flex items-center justify-between bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg shadow-sm">
//           <span className="text-gray-700 font-medium">Total Members</span>
//           <span className="text-green-700 font-bold">{group.totalMembers}</span>
//         </div>

//         {/* CO2 Saved */}
//         <div className="flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow-sm">
//           <span className="text-gray-700 font-medium">CO₂ Saved</span>
//           <span className="text-blue-700 font-bold">{group.co2Saved} kg</span>
//         </div>

//         {/* Water Saved */}
//         <div className="flex items-center justify-between bg-gradient-to-r from-teal-100 to-teal-200 p-4 rounded-lg shadow-sm">
//           <span className="text-gray-700 font-medium">Water Saved</span>
//           <span className="text-teal-700 font-bold">{group.waterSaved} L</span>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Daily Challenge Component
// const DailyChallenge = () => {
//   // Mock Data for Today's Challenge
//   const todaysChallenge = {
//     question: "How many kilometers did you walk today?",
//     tip: "Walking reduces your carbon footprint and keeps you healthy!",
//   };

//   return (
//     <section className="bg-white shadow-2xl rounded-3xl p-8 space-y-4 mx-4 mt-8">
//       <h2 className="text-2xl font-bold text-gray-800">Daily Challenge</h2>
//       <p className="text-gray-700">{todaysChallenge.question}</p>
//       <p className="text-sm text-gray-500 italic">{todaysChallenge.tip}</p>
//       <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
//         Log Your Progress
//       </button>
//     </section>
//   );
// };

// // GroupMembers Component
// const GroupMembers = ({ members }) => {
//   return (
//     <section className="mt-8">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Group Members</h2>
//       <div className="flex space-x-4 overflow-x-auto pb-4">
//         {members.map((member) => (
//           <div
//             key={member.id}
//             className="min-w-[150px] p-4 bg-white shadow-lg rounded-lg flex flex-col items-center"
//           >
//             <img
//               src={`https://i.pravatar.cc/150?u=${member.id}`}
//               alt={`${member.name}'s profile`}
//               className="w-16 h-16 rounded-full mb-2"
//             />
//             <p className="text-sm font-medium text-center">{member.name}</p>
//             <div className="w-full mt-2">
//               <div className="bg-gray-200 rounded-full h-2.5">
//                 <div
//                   className="bg-green-600 h-2.5 rounded-full"
//                   style={{ width: `${member.progress}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default GreenConnect;

import React from 'react';

const GroupHeader = ({ group }) => {
  return (
    <section className="bg-white shadow-2xl rounded-3xl p-8 space-y-6 mx-4">
      {/* Group Name */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">{group.name}</h1>
        <p className="text-sm text-gray-500">Group Code: {group.code}</p>
      </div>

      {/* Group Stats */}
      <div className="space-y-4">
        {/* Total Members */}
        <div className="flex items-center justify-between bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg shadow-sm">
          <span className="text-gray-700 font-medium">Total Members</span>
          <span className="text-green-700 font-bold">{group.totalMembers}</span>
        </div>

        {/* CO2 Saved */}
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow-sm">
          <span className="text-gray-700 font-medium">CO₂ Saved</span>
          <span className="text-blue-700 font-bold">{group.co2Saved} kg</span>
        </div>

        {/* Water Saved */}
        <div className="flex items-center justify-between bg-gradient-to-r from-teal-100 to-teal-200 p-4 rounded-lg shadow-sm">
          <span className="text-gray-700 font-medium">Water Saved</span>
          <span className="text-teal-700 font-bold">{group.waterSaved} L</span>
        </div>
      </div>
    </section>
  );
};

export default GroupHeader;