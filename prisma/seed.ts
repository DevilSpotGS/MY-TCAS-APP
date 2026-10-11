import {PrismaClient,StudyPlan} from '@prisma/client';const p=new PrismaClient();
async function main(){await p.auditLog.deleteMany();await p.tcasScore.deleteMany();await p.admissionCriteria.deleteMany();await p.student.deleteMany();await p.school.deleteMany();await p.university.deleteMany();
const school=await p.school.create({data:{schoolCode:'SCH001',name:'โรงเรียนสาธิต Smart TCAS'}});
const student=await p.student.create({data:{schoolId:school.id,studentCode:'65001',citizenId:'1101700000001',fullName:'สมชาย ใจดี',studyPlan:StudyPlan.SCIENCE_MATH,gpax:3.42,gradYear:2569}});
await p.tcasScore.create({data:{studentId:student.id,tgatScore:72,tpat1Score:0,tpat2Score:65,tpat3Score:78,tpat4Score:0,tpat5Score:0}});
const ku=await p.university.create({data:{abbreviation:'KU',name:'มหาวิทยาลัยเกษตรศาสตร์'}});const cu=await p.university.create({data:{abbreviation:'CU',name:'จุฬาลงกรณ์มหาวิทยาลัย'}});
await p.admissionCriteria.createMany({data:[{universityId:ku.id,campus:'กำแพงแสน',faculty:'ศิลปศาสตร์และวิทยาศาสตร์',major:'วิทยาการคอมพิวเตอร์',studyPlan:StudyPlan.SCIENCE_MATH,minGpax:2.75,minTgat:60,minTpat3:70},{universityId:ku.id,campus:'บางเขน',faculty:'วิศวกรรมศาสตร์',major:'วิศวกรรมคอมพิวเตอร์',studyPlan:StudyPlan.SCIENCE_MATH,minGpax:3.00,minTgat:65,minTpat3:75},{universityId:cu.id,campus:'ปทุมวัน',faculty:'วิทยาศาสตร์',major:'วิทยาการคอมพิวเตอร์',studyPlan:StudyPlan.SCIENCE_MATH,minGpax:3.50,minTgat:70,minTpat3:80}]});console.log('Seed complete')}
main().finally(()=>p.$disconnect());
