const express = require('express');
const path = require('path'); // Для работы с путями
const app = express();
const PORT = 3000;

// Middleware для обработки JSON
app.use(express.json());

// Указываем папку для статических файлов (например, 'public')
app.use(express.static(path.join(__dirname, 'public')));

// Данные в памяти
const groups = [
    {
        name: 'Группа 1',
        students: [
            { name: 'Иван Иванов', attendance: {}, grades: {} },
            { name: 'Мария Петрова', attendance: {}, grades: {} },
        ]
    },
    {
        name: 'Группа 2',
        students: [
            { name: 'Алексей Смирнов', attendance: {}, grades: {} },
            { name: 'Анна Кузнецова', attendance: {}, grades: {} },
        ]
    }
];

// Маршрут для получения списка групп
app.get('/groups', (req, res) => {
    const groupNames = groups.map(group => ({ name: group.name }));
    res.json(groupNames);
});

// Маршрут для получения студентов конкретной группы
app.get('/groups/:groupName', (req, res) => {
    const groupName = req.params.groupName;
    const group = groups.find(g => g.name === groupName);

    if (!group) {
        return res.status(404).json({ error: 'Группа не найдена' });
    }

    res.json(group.students);
});

// Маршрут для обновления данных студента
app.post('/update-student', (req, res) => {
    const { groupName, studentName, date, attendance, grade } = req.body;

    const group = groups.find(g => g.name === groupName);
    if (!group) {
        return res.status(404).json({ error: 'Группа не найдена' });
    }

    const student = group.students.find(s => s.name === studentName);
    if (!student) {
        return res.status(404).json({ error: 'Студент не найден' });
    }

    // Обновляем данные
    if (attendance) {
        student.attendance[date] = attendance;
    }
    if (grade !== undefined) {
        student.grades[date] = grade;
    }

    res.json({ message: 'Данные обновлены' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});