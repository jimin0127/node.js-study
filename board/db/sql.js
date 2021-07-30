module.exports = {
        list: 'select * from board order by id',
        insert: 'insert into board(title, name, content, regdate, modidate, passwd, hit, file_name, file_path) values(?, ?, ?, ?, ?, ?, ?,?, ?)', 
        read: 'select * from board where id = ?', 
        hit : 'update board set hit = ? where id = ?',
        update: 'update board set title=?, content = ?, modidate=? where id=?', 
        delete: 'delete from board where id=?', 
        search : "select * from board WHERE name LIKE ? or  title LIKE ? or content LIKE ?", 
        user_insert: 'insert into user(user_id, passwd, email, tel, reg_date) values(?, ?, ?, ?, ?)', 
        user_read: 'select * from user where user_id = ?'  
}