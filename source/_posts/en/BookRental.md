---
title: BookRental project
categories:
    - Documentation
tags:
    - web
    - cms
    - documentation
    - application
    - database
    - model
lang: en
date: 2017-11-21 12:00:00
---
[**BookRental**](https://github.com/T3r1jj/BookRental) is one of the older projects covering several JEE aspects. Its aim was to create a library management system; namely, management of: books, loans, reservations, users and employees. The application implements more than 20 different business features.
The main technologies used in the project are: Java, JSTL, JSF, PrimeFaces, JPA, JDB. The presentation of the application can be viewed in [the gallery](/en/galleries/BookRental/). At times, it does not look too attractive since it was created at the beginning of learning JEE and web technologies [2015] (check out [Develog](https://github.com/T3r1jj/Develog) to see the difference).
<!-- more -->

The features implemented in the application are:
1. Displaying the list of books. Books cart with the possibility of adding and removing books. Book borrow feature.
2. Book management in the administration panel.
3. Registration of readers. Confirmation of registration in the administration panel. The ability to log in to your account. Only logged in users can borrow books.
4. Accounts for rental employees. Employees can manage books, readers and rentals. Employees are managed by an administrator.
5. Book categories. Categories form multi-level trees. Each book belongs to exactly one category, the ability to browse books by category.
6. Labels (tags) for books. Each book can be labeled with many labels. Browsing books by labels.
7. Additional resources for the description of the book, e.g. source codes for programs, samples of music or movies. Each file has its own description. The number of files is not limited.
8. Searching for books based on the title, author's name, ISBN and possibly other attributes.
9. Boolean operators: *and*, *or*, *not*; when searching.
10. Search history. Each logged in user can save search results in the database to be able to rerun them at other times.
11. Browsing the reader's rental archives.
12. Loan administration. Rental status: book in stock, waiting for pickup (is on the reader's shelf), loaned out. Manual status change by an employee.
13. Books stock - automatic status update for borrowing and returning the book.
14. Ability to subscribe to the queue when the book is currently not in stock (reservation).
15. Financial penalties for keeping books too long. Blocking rentals when books are not returned and no penalty is paid. The maximum retention time set by the administrator.
16. Messages editable by the administrator and posted on the main page.
17. Display of news (several recently added books) on the home page.
18. Selecting skins (themes) for the user interface.
19. Additional language version of the user interface.

## Project
Due to the selected technologies, the standard application architecture has been used, depicted by the picture below:  
![BookRental architecture](/images/BookRental/arch.jpg)
<center style="margin-top: -1em;"><small>Source: http://www.thejavageek.com</small></center>

The application implements the MVC pattern, which is divided into three parts:
- model (JPA + EJB) - represents data from the database in a logical form, implements business functions;
- view (JSF page) - displays model data;
- controller (JSF bean) - receives input data from the user, processes it, updates and refreshes the model.

Normalized database model (3NF - incomplete, slightly redundant):
![Model bazy danych](/images/BookRental/db.jpg)

Some assumptions that might require explanation:
1. If the book does not have an ISBN number (which happens, but very rarely), it should be given a unique value because the books are distinguished by the ISBN field.
2. The copies of the same books do not differ in the ISBN (they differ by an id number).
3. Category, tags and resources (eg files) and reservations in the absence of books in the warehouse are assigned to the ISBN.
4. Loans and reservations are assigned to the book.

## Structure

The structure of the project is presented in the figure below:
![Project structure](/images/BookRental/struct.jpg)  
Each package has a different purpose:
- entity classes - POJO, pack data retrieved from the database into abstract types such as *Book*.
- session / facade classes - EJB facades, allow communication with a database at a higher level than JDBC. These beans operate on the server side and can be injected into other components. In this case, annotated <code>@Stateless</code>, allow the implementation of reusable services.
- controller / jsf classes - JSF view controllers, managed beans *(ManagedBean)*, with the declared scope, eg *SessionScoped, ViewScoped, ApplicationScoped*, etc. They store state according to the scope and ensure communication with JSF websites. JSF pages can retrieve the beana state using the expression <code>#{bean.field}</code> (assuming that getters and setters have been implemented).

The JSF pages are part of the last layer - the view. The *Facelets* template system is used to build JSF pages. In the case of this project, an open source PrimeFaces has been chosen - an UI component library. Thanks to this framework, it is possible to easily create a rich user interface.  
![View structure (1/2)](/images/BookRental/view.jpg)

**WEB-INF** is a special folder in the application structure that is not publicly available, it is not part of the public document tree. The "view" subfolder in the WEB-INF folder has been separated and there are specific views. Elements with characteristic names such as "Create", "Edit" or "View" represent windows (dialogs), which through compositions are included in other views (mainly lists) and displayed when the button is clicked. For the user, access to the windows is only available through the views, so they (dialogs) were placed in the WEB-INF folder.


The next elements are **templates**, which also use the composition mechanism and the user should not have access to them. The last component of the WEB-INF folder are the pages to which the user is redirected after logging in. They inform, among others, about the lack of rights to browse the page; blocked or inactive account; as well as about the success of the login or registration process.    
![View structure (2/2)](/images/BookRental/view2.jpg)

Four different templates are attached to pages depending on the logged in user's (or guest's) rights. The displayed data format also changes, therefore different views have been created that display data in the form of lists. These views use shared windows declared in the WEB-INF folder.

## Additional info

Parts worth attention:
- passwords **hashed** with SHA-256 hash function, in subsequent versions of the application could be supplemented with salt.
- *OptionsController* loads application options from a file on the server (e.g. data related to the maximum rental period or penalty value for the day of delay).
- *AuthorizationFilter* - *PhaseFilter* that supervises access to sites that require specific permissions. It is responsible for redirecting in case of user not being activated or being banned.
- *ThemeSwitcherBean* and *LanguageSwitcherBean* manage selection of language and theme preferences selected by the user as a cookie.

The management of the connection to the database is handled by **Glassfish** server. The database type is **Java DB**. Transaction type is **JTA**, **EntityManager** is injected via <code>@PersistenceContext</code>.

After the bean has been constructed, but before its use, the language value will be set (based on a cookie or a previously initiated value if there is no cookie). After changing the language, the text will be loaded from the corresponding _Bundle*_ file from the resources directory.

![Cookies with a selected theme and language](/images/BookRental/view2.jpg)

During the implementation of this feature, the JSTL library was used, and more precisely the *fmt* tags: *setLocale* and *setBundle* were used, thanks to which the files with correct translation are connected with the page. This allows the use of the message tag with the *key* parameter - a mapping in the file to the translated phrase.

One of the project's flaws is missing i18n for admin news. This feature was missed out during the project and implementation phase. The design also looks a bit old, as this project is one of the older ones.