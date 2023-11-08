FROM postgres:latest
ENV POSTGRES_EXAM exam
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD root
COPY init-db.sh /docker-entrypoint-initdb.d/
EXPOSE 5432