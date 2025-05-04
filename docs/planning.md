# ECHO Development Task List

## 1. ⚙️ Basic Setup & Configuration 
- [x] Set up Tauri V2 project with React and Mantine
- [x] Configure SQLite via Tauri SQLX plugin
- [x] Integrate Drizzle ORM with SQLX including migrations

## 2. 🎨 Layout & Design 
- [ ] Build base UI structure (main window, header, sidebar, etc.)
- [ ] Create tab layout with custom tab component
- [ ] Create modular layout system for widgets
- [ ] Implement Mac-style open/close window buttons
- [ ] Add dark/light mode toggle
- [ ] Finalize chat dialog styling and layout

## 3. 💬 Core Features
- [ ] Add Chat System
- [ ] Add Project Management
- [ ] Add Task Management
- [ ] Add Widgets & Extensions
- [ ] Add Media & Input features
- [ ] Add Extra / Advanced features

### 3.1 🗨️ Chat System
- [ ] Add Gemini API integration
- [ ] Implement chat input and output components
- [ ] Store chat history in DB
- [ ] Enable chat history management
- [ ] Sync state between AI backend and UI
- [ ] Handle input states and error handling

### 3.2 📁 Project Management
- [ ] Design project + task data structure
- [ ] Build UI to create and manage projects
- [ ] Support auto-generating subtasks from goal/description
- [ ] Track task completion and show progress
- [ ] Persist project/task data in DB
- [ ] Show project activity log or history

### 3.3 ✅ Task Management
- [ ] Create task widget (lightweight)
- [ ] Integrate tasks into project flow
- [ ] Add due date / reminder fields
- [ ] Display task lists in main view
- [ ] Hook tasks into notification system (when ready)

### 3.4 🧩 Widgets & Extensions
- [ ] Create calendar widget
- [ ] Add task/reminder widget with simple scheduling
- [ ] Allow toggling widgets from settings
- [ ] Store widget preferences and layout persistently

### 3.5 📸 Media & Input
- [ ] Add screenshot capture (window or region)
- [ ] Enable audio recording from microphone
- [ ] Support pasting YouTube/video links with preview
- [ ] Connect screenshot input to local/API vision model
- [ ] (Optional) Extract summaries or descriptions from media

### 3.6 🚀 Extra / Advanced
- [ ] Investigate background reminders using Windows alarm/timer APIs
- [ ] Implement cross-platform native notification scheduling
- [ ] Add system tray integration (if needed for background tasks)
- [ ] Explore AI-assisted commands (e.g. “remind me in 10 min”)
