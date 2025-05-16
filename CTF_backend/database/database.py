from sqlmodel import SQLModel, Session, create_engine
from sqlalchemy.engine import Engine

def create_db_and_tables(engine: Engine):
    SQLModel.metadata.create_all(engine)

def get_engine():
    connect_args = {"check_same_thread": False}
    engine = create_engine("sqlite:///ctf.db", echo=True, connect_args=connect_args)
    return engine

def get_session():
    engine = get_engine()
    with Session(engine) as session:
        yield session
