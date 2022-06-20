       IDENTIFICATION DIVISION.
       PROGRAM-ID. PRC01.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
           01 NAME PIC X(20).
       PROCEDURE DIVISION.
           DISPLAY "What is your name?".
           ACCEPT NAME FROM CONSOLE.
           DISPLAY "HELLO, " NAME.
           STOP RUN.
