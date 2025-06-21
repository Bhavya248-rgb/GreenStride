// import React, { useState } from 'react';

// const GroupSidebar = ({ onCreateGroup, onGroupClick }) => {
//   // Mock Data for Groups
//   const mockGroups = [
//     { id: 1, name: "Eco Warriors" },
//     { id: 2, name: "Green Champions" },
//     { id: 3, name: "Zero Waste Heroes" },
//     { id: 4, name: "Sustainable Living" },
//     { id: 5, name: "Climate Action Crew" },
//   ];

//   // Modal States
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

//   // Form States
//   const [groupName, setGroupName] = useState('');
//   const [groupCode, setGroupCode] = useState('');

//   // Handle Create Group
//   const handleCreateGroup = () => {
//     if (groupName.trim()) {
//       onCreateGroup(groupName); // Pass the group name to the parent
//       setGroupName(''); // Reset input
//       setIsCreateModalOpen(false); // Close modal
//     }
//   };

//   // Handle Join Group
//   const handleJoinGroup = () => {
//     if (groupCode.trim()) {
//       alert(`Joined group with code: ${groupCode}`); // Simulate joining a group
//       setGroupCode(''); // Reset input
//       setIsJoinModalOpen(false); // Close modal
//     }
//   };

//   return (
//     <aside className="fixed top-8 left-8 h-[calc(100vh-7rem)] w-72 bg-white shadow-2xl rounded-3xl p-6 space-y-6 z-50 mt-15">
//       {/* Create Group Button */}
//       <button
//         onClick={() => setIsCreateModalOpen(true)}
//         className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300"
//       >
//         + Create Group
//       </button>

//       {/* Join Group Button */}
//       <button
//         onClick={() => setIsJoinModalOpen(true)}
//         className="w-full p-3 bg-gradient-to-r border-green-500 text-black font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300"
//       >
//         + Join Group
//       </button>

//       {/* Groups List */}
//       <div className="space-y-4 overflow-y-auto max-h-[calc(100%-9rem)]">
//         {mockGroups.length > 0 ? (
//           mockGroups.map((group) => (
//             <div
//               key={group.id}
//               onClick={() => onGroupClick(group)}
//               className="block w-full p-4 bg-gray-50 text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition duration-300 cursor-pointer shadow-sm"
//             >
//               {group.name}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No groups yet.</p>
//         )}
//       </div>

//       {/* Create Group Modal */}
//       {isCreateModalOpen && (
//         <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Create a New Group</h2>
//             <input
//               type="text"
//               placeholder="Group Name"
//               value={groupName}
//               onChange={(e) => setGroupName(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setIsCreateModalOpen(false)}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreateGroup}
//                 className="px-4 py-2 bg-green-600 text-white rounded"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Join Group Modal */}
//       {isJoinModalOpen && (
//         <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Join a Group</h2>
//             <input
//               type="text"
//               placeholder="Enter Group Code"
//               value={groupCode}
//               onChange={(e) => setGroupCode(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setIsJoinModalOpen(false)}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleJoinGroup}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Join
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </aside>
//   );
// };

// export default GroupSidebar;


import React from 'react';

const GroupSidebar = ({
  mockGroups,
  onCreateGroup,
  onJoinGroup,
  onGroupClick,
  isCreateModalOpen,
  setIsCreateModalOpen,
  isJoinModalOpen,
  setIsJoinModalOpen,
  groupName,
  setGroupName,
  groupCode,
  setGroupCode,
  handleCreateGroup,
  handleJoinGroup,
}) => {
  return (
    <aside className="fixed top-8 left-8 h-[calc(100vh-7rem)] w-72 bg-white shadow-2xl rounded-3xl p-6 space-y-6 z-50 mt-15">
      {/* Create Group Button */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300"
      >
        + Create Group
      </button>

      {/* Join Group Button */}
      <button
        onClick={() => setIsJoinModalOpen(true)}
        className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
      >
        + Join Group
      </button>

      {/* Groups List */}
      <div className="space-y-4 overflow-y-auto max-h-[calc(100%-9rem)]">
        {mockGroups.map((group) => (
          <div
            key={group.id}
            onClick={() => onGroupClick(group)}
            className="block w-full p-4 bg-gray-50 text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition duration-300 cursor-pointer shadow-sm"
          >
            {group.name}
          </div>
        ))}
      </div>

      {/* Create Group Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create a New Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Join a Group</h2>
            <input
              type="text"
              placeholder="Enter Group Code"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsJoinModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default GroupSidebar;