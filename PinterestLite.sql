USE Pinterest_lite;
SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS=0; 
DROP TABLE if exists Post;
DROP TABLE if exists Follower;
DROP TABLE if exists Tag;
DROP TABLE if exists Post_Tag;
DROP TABLE if exists User;
DROP TABLE if exists Post_Comment;
SET SQL_SAFE_UPDATES = 1;
SET FOREIGN_KEY_CHECKS=1; 

CREATE TABLE User(UserID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
Email VARCHAR(255) UNIQUE NOT NULL, 
Password VARCHAR(255) NOT NULL, 
FName VARCHAR(50) NOT NULL,
LName VARCHAR(50) NOT NULL,
SignUpDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
ENGINE = InnoDB;

CREATE TABLE Post(PostID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
UserID INT UNSIGNED  NOT NULL,
OrigImgURL VARCHAR(1000) NOT NULL,
LocalImgURL VARCHAR(255) NOT NULL,
Description VARCHAR(255) NOT NULL,
PostTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (UserID) REFERENCES User (UserID)
ON DELETE CASCADE
ON UPDATE CASCADE)
ENGINE = InnoDB;


CREATE TABLE Tag(TagID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
TagValue VARCHAR(45) UNIQUE)
ENGINE = InnoDB;

CREATE TABLE Follower(UserID INT UNSIGNED, FollowerID INT UNSIGNED, 
PRIMARY KEY(UserID, FollowerID),
FOREIGN KEY(UserID) REFERENCES User(UserID)
ON DELETE CASCADE
ON UPDATE CASCADE,
FOREIGN KEY(FollowerID) REFERENCES User(UserID)
ON DELETE CASCADE
ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE Post_Tag(PostID INT UNSIGNED NOT NULL,
TagID INT UNSIGNED NOT NULL,
PRIMARY KEY (PostID, TagID),   
FOREIGN KEY (TagID) REFERENCES Tag (TagID),
FOREIGN KEY (PostID) REFERENCES Post (PostID)
ON DELETE CASCADE
ON UPDATE CASCADE);

CREATE TABLE Post_Comment(PostID INT UNSIGNED NOT NULL,
Comment VARCHAR(255) NOT NULL,
PRIMARY KEY (PostID, Comment),   
FOREIGN KEY (PostID) REFERENCES Post (PostID)
ON DELETE CASCADE
ON UPDATE CASCADE);

SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS=0; 
Drop Procedure if exists comment_tag;
SET SQL_SAFE_UPDATES = 1;
SET FOREIGN_KEY_CHECKS=1;

DELIMITER //
CREATE PROCEDURE comment_tag
(IN comm VARCHAR(255), tag VARCHAR(50), pID INT)
BEGIN
  DECLARE id INT;
  
  IF comm = '' AND tag = '' THEN
  SET id = id;
  ELSEIF comm = '' THEN 
  INSERT IGNORE INTO TAG (TagValue) VALUES (tag);
  SELECT TagID into id FROM Tag WHERE TagValue = tag;
  INSERT INTO Post_Tag (PostID, TagID) VALUES (pID, id);
  ELSEIF tag = '' THEN 
  INSERT INTO Post_Comment (PostID, Comment) VALUES (pID, comm);
  ELSE 
  INSERT IGNORE INTO TAG (TagValue) VALUES (tag);
  INSERT INTO Post_Comment (PostID, Comment) VALUES (pID, comm);
  SELECT TagID into id FROM Tag WHERE TagValue = tag;
  INSERT INTO Post_Tag (PostID, TagID) VALUES (pID, id);
  END IF;
  
END //
DELIMITER ;


SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS=0; 
DROP VIEW IF EXISTS DescriptionTags;
SET SQL_SAFE_UPDATES = 1;
SET FOREIGN_KEY_CHECKS=1;
CREATE VIEW DescriptionTags AS
SELECT p.*, t.TagID AS tagIDFromTag, pt.TagID, pt.PostID AS postIDFromPostTag, t.TagValue 
FROM Post p 
LEFT JOIN Post_Tag pt ON p.PostID = pt.PostID 
LEFT JOIN Tag t ON pt.TagID = t.TagID;



SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS=0; 
DROP VIEW IF EXISTS PostsUser;
SET SQL_SAFE_UPDATES = 1;
SET FOREIGN_KEY_CHECKS=1;
SELECT * FROM DescriptionTags;

CREATE VIEW PostsUser AS
SELECT p.Description, p.UserID, p.PostID, p.OrigImgURL, p.LocalImgURL, u.FName, u.LName FROM Post as p Join User as u on p.UserID = u.UserID;



