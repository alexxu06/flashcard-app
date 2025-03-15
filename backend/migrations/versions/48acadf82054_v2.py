"""v2

Revision ID: 48acadf82054
Revises: e7efdf231461
Create Date: 2025-03-15 00:11:52.817619

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '48acadf82054'
down_revision = 'e7efdf231461'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user_table', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_user_table_email'), ['email'], unique=True)
        batch_op.create_index(batch_op.f('ix_user_table_username'), ['username'], unique=True)

    op.create_table('deck_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user_table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('deck_table', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_deck_table_name'), ['name'], unique=False)
        batch_op.create_index(batch_op.f('ix_deck_table_user_id'), ['user_id'], unique=False)

    op.create_table('flashcard_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('front', sa.String(), nullable=False),
    sa.Column('back', sa.String(), nullable=False),
    sa.Column('deck_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['deck_id'], ['deck_table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('flashcard_table', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_flashcard_table_back'), ['back'], unique=False)
        batch_op.create_index(batch_op.f('ix_flashcard_table_deck_id'), ['deck_id'], unique=False)
        batch_op.create_index(batch_op.f('ix_flashcard_table_front'), ['front'], unique=False)

    with op.batch_alter_table('deck', schema=None) as batch_op:
        batch_op.drop_index('ix_deck_name')

    op.drop_table('deck')
    with op.batch_alter_table('flashcard', schema=None) as batch_op:
        batch_op.drop_index('ix_flashcard_back')
        batch_op.drop_index('ix_flashcard_front')

    op.drop_table('flashcard')
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index('ix_user_email')
        batch_op.drop_index('ix_user_username')

    op.drop_table('user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('username', sa.VARCHAR(), nullable=False),
    sa.Column('email', sa.VARCHAR(), nullable=False),
    sa.Column('password', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index('ix_user_username', ['username'], unique=1)
        batch_op.create_index('ix_user_email', ['email'], unique=1)

    op.create_table('flashcard',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('front', sa.VARCHAR(), nullable=False),
    sa.Column('back', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('flashcard', schema=None) as batch_op:
        batch_op.create_index('ix_flashcard_front', ['front'], unique=False)
        batch_op.create_index('ix_flashcard_back', ['back'], unique=False)

    op.create_table('deck',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('deck', schema=None) as batch_op:
        batch_op.create_index('ix_deck_name', ['name'], unique=False)

    with op.batch_alter_table('flashcard_table', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_flashcard_table_front'))
        batch_op.drop_index(batch_op.f('ix_flashcard_table_deck_id'))
        batch_op.drop_index(batch_op.f('ix_flashcard_table_back'))

    op.drop_table('flashcard_table')
    with op.batch_alter_table('deck_table', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_deck_table_user_id'))
        batch_op.drop_index(batch_op.f('ix_deck_table_name'))

    op.drop_table('deck_table')
    with op.batch_alter_table('user_table', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_user_table_username'))
        batch_op.drop_index(batch_op.f('ix_user_table_email'))

    op.drop_table('user_table')
    # ### end Alembic commands ###
