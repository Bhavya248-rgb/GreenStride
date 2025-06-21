import React, { useState } from 'react';
import GroupSidebar from './GroupSidebar';
import GroupHeader from './GroupHeader';
import DailyChallenge from './DailyChallenge';
import LogsSection from './LogsSection';
import GroupMembers from './GroupMembers';

const App = () => {
  const mockGroups = [
    { id: 1, name: "Eco Warriors", code: "ECO123", totalMembers: 50, co2Saved: 12000, waterSaved: 50000 },
    { id: 2, name: "Green Champions", code: "GRN456", totalMembers: 30, co2Saved: 8000, waterSaved: 30000 },
    { id: 3, name: "Zero Waste Heroes", code: "ZWH789", totalMembers: 20, co2Saved: 5000, waterSaved: 20000 },
  ];

  const mockMembers = [
    { id: 1, name: "John Doe", progress: 75 },
    { id: 2, name: "Jane Smith", progress: 50 },
    { id: 3, name: "Alice Johnson", progress: 90 },
    { id: 4, name: "Bob Brown", progress: 60 },
    { id: 5, name: "Charlie Davis", progress: 80 },
  ];

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [logs, setLogs] = useState([
    { id: 1, memberId: 1, memberName: "John Doe", imageUrl: "https://via.placeholder.com/150", upvotes: 5, downvotes: 1 },
    { id: 2, memberId: 2, memberName: "Jane Smith", imageUrl: "https://via.placeholder.com/150", upvotes: 3, downvotes: 2 },
  ]);
  const [imageProof, setImageProof] = useState(null);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');

  // Handle Group Click
  const handleGroupClick = (group) => setSelectedGroup(group);

  // Handle Log Submission
  const handleLogSubmission = () => {
    if (!imageProof) {
      alert("Please upload an image as proof!");
      return;
    }

    const newLog = {
      id: logs.length + 1,
      memberId: Math.floor(Math.random() * 5) + 1,
      memberName: mockMembers[Math.floor(Math.random() * mockMembers.length)].name,
      imageUrl: URL.createObjectURL(imageProof),
      upvotes: 0,
      downvotes: 0,
    };

    setLogs([newLog, ...logs]);
    setImageProof(null);
  };

  // Handle Voting
  const handleVote = (logId, type) => {
    setLogs((prevLogs) =>
      prevLogs.map((log) =>
        log.id === logId
          ? type === "upvote"
            ? { ...log, upvotes: log.upvotes + 1 }
            : { ...log, downvotes: log.downvotes + 1 }
          : log
      )
    );
  };

  // Handle Create Group
  const handleCreateGroup = () => {
    if (groupName.trim()) {
      alert(`Created group: ${groupName}`);
      setGroupName(''); // Reset input
      setIsCreateModalOpen(false); // Close modal
    }
  };

  // Handle Join Group
  const handleJoinGroup = () => {
    if (groupCode.trim()) {
      alert(`Joined group with code: ${groupCode}`);
      setGroupCode(''); // Reset input
      setIsJoinModalOpen(false); // Close modal
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Group Sidebar */}
      <GroupSidebar
        mockGroups={mockGroups}
        onCreateGroup={handleCreateGroup}
        onJoinGroup={handleJoinGroup}
        onGroupClick={handleGroupClick}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        isJoinModalOpen={isJoinModalOpen}
        setIsJoinModalOpen={setIsJoinModalOpen}
        groupName={groupName}
        setGroupName={setGroupName}
        groupCode={groupCode}
        setGroupCode={setGroupCode}
      />

      {/* Main Content */}
      <main className="ml-[22rem] p-8">
        {selectedGroup ? (
          <>
            <GroupHeader group={selectedGroup} />
            <DailyChallenge onLogSubmit={handleLogSubmission} setImageProof={setImageProof} />
            <LogsSection logs={logs} onVote={handleVote} />
            <GroupMembers members={mockMembers} />
          </>
        ) : (
          <p className="text-center text-gray-500">Select a group to view details.</p>
        )}
      </main>
    </div>
  );
};

export default App;