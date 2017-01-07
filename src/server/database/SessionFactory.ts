import {SessionFactory} from "hydrate-mongodb";

export var SessionManager: SessionFactory;

export function initSessionFactory(sessionFactory: SessionFactory)
{
    SessionManager = sessionFactory;
}