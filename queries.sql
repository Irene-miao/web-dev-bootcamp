create table books (
    id serial PRIMARY KEY,
    title varchar(100) not null,
    author varchar(50),
    synopsis varchar(500) not null,
    isbn int not null,
);

create table reviews (
    id serial PRIMARY KEY,
    content varchar(100) not null,
    book_id int not null,
    rating int not null,
    constraint fk_book
    foreign key(book_id) references books(id)
);

insert into books(title, author, synopsis, isbn) values ('Vedic astrology', 'Komilla Sutton', 'A basic introduction to the science and art of Jyotish by a prominent English Jyotishi.', 1885585799);

insert into reviews(content, book_id, rating) values ();