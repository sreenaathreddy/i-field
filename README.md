# Telecom O&M Field App

A single-file **HTML/CSS/JavaScript** web application designed for **Telecom Operations & Maintenance (O&M)** field teams. It provides role-based access, telecom site monitoring, infrastructure tracking, spare-part approvals, GPS check-in, alarms, and utility management in a mobile-friendly interface. 0

---

## 📌 Overview

This application simulates a real-world telecom tower/site maintenance system where multiple departments interact:

- **Technician** – Handles field maintenance and spare requests
- **Rigger** – Tower hardware support
- **IE** – Initial approval authority
- **IL** – Secondary approval authority
- **JC Store** – Inventory / part issuing
- **Admin** – Full access

The system is fully front-end based using static data arrays and JavaScript logic.

---

# 🚀 Features

## 🔐 1. Login System

Role-based demo login credentials are built in.

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Technician | tech@telecom.com | tech123 |
| Rigger | rigger@telecom.com | rig123 |
| IE | ie@telecom.com | ie123 |
| IL | il@telecom.com | il123 |
| JC Store | store@telecom.com | store123 |
| Admin | admin@telecom.com | admin123 |

---

## 🏠 2. Dashboard / Home Page

After login, users land on the main dashboard showing:

### KPI Stats

- Total Sites
- Live Sites
- Active Alarms
- Pending Spare Requests

### Search Functionality

Search by:

- Site ID
- Site Name
- Circle
- Cluster

### Site Cards

Each telecom site displays:

- Live / Off-Air status
- Circle / Cluster
- Tenant count
- Alarm count
- Fuel warning
- PM schedule

---

## 📡 3. Site Detail View

Clicking a site opens detailed infrastructure tabs.

---

# 📂 Tabs Included

## 1️⃣ Basic Info

Displays:

- Site ID
- Site Name
- Coordinates
- Operators
- Power Source
- Solar Status
- Grid Status

---

## 2️⃣ DG (Diesel Generator)

Tracks DG equipment:

- Manufacturer
- Capacity
- Tank Capacity
- Fuel %
- DG Battery
- Serial Numbers
- PM Dates
- Fuel alerts

Includes animated fuel tank UI.

---

## 3️⃣ Battery Bank

Displays:

- Battery Count
- Health %
- Working / Faulty Units
- Brand
- Capacity

---

## 4️⃣ Rectifier

Tracks telecom rectifier modules:

- Model
- Quantity
- Load %
- Working Status

---

## 5️⃣ EB Supply (Electricity Bills)

Monthly electricity billing data:

- Opening Reading
- Closing Reading
- Units Consumed
- Rate
- Amount
- Paid / Unpaid

---

## 6️⃣ Alarms

Real-time alerts such as:

- Mains Fail
- Fuel Critical
- Battery Low
- Module Offline

---

## 7️⃣ Spare Parts

Allows request approval workflow.

---

# 🔄 Spare Part Approval Flow

```text
Technician / Rigger
        ↓
        IE Approval
        ↓
        IL Approval
        ↓
      JC Store
        ↓
    Parts Issued
