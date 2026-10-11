import { prisma } from '@/lib/prisma';
export async function getStudentResults(studentId: string) {
  const student = await prisma.student.findUnique({ where: { id: studentId }, include: { scores: true } });
  if (!student) throw new Error('Student not found');
  const criteria = await prisma.admissionCriteria.findMany({ include: { university: true }, orderBy: [{ university: { name: 'asc' } }, { faculty: 'asc' }, { major: 'asc' }] });
  const s = student.scores ?? { tgatScore: 0, tpat1Score: 0, tpat2Score: 0, tpat3Score: 0, tpat4Score: 0, tpat5Score: 0 };
  return criteria.map(c => {
    const reasons: string[] = [];
    const planPass = c.studyPlan === 'GENERAL' || c.studyPlan === student.studyPlan;
    const checks = [
      ['แผนการเรียน', planPass, `${student.studyPlan} / ต้องการ ${c.studyPlan}`],
      ['GPAX', student.gpax >= c.minGpax, `${student.gpax} / ${c.minGpax}`],
      ['TGAT', s.tgatScore >= c.minTgat, `${s.tgatScore} / ${c.minTgat}`],
      ['TPAT1', s.tpat1Score >= c.minTpat1, `${s.tpat1Score} / ${c.minTpat1}`],
      ['TPAT2', s.tpat2Score >= c.minTpat2, `${s.tpat2Score} / ${c.minTpat2}`],
      ['TPAT3', s.tpat3Score >= c.minTpat3, `${s.tpat3Score} / ${c.minTpat3}`],
      ['TPAT4', s.tpat4Score >= c.minTpat4, `${s.tpat4Score} / ${c.minTpat4}`],
      ['TPAT5', s.tpat5Score >= c.minTpat5, `${s.tpat5Score} / ${c.minTpat5}`]
    ] as const;
    const pass = checks.every(([, ok]) => ok);
    for (const [name, ok, detail] of checks) if (!ok) reasons.push(`${name}: ${detail}`);
    return { id: c.id, university: c.university.name, abbreviation: c.university.abbreviation, campus: c.campus, faculty: c.faculty, major: c.major, studyPlan: c.studyPlan, pass, reasons };
  });
}
